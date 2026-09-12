"""Email notification service using Gmail SMTP.

Sends form submissions (Quote Requests / Contact Messages) to NOTIFY_TO.
Failure to send NEVER breaks the API response.
"""
from __future__ import annotations

import asyncio
import logging
import os
import smtplib
import ssl
from email.message import EmailMessage
from email.utils import formataddr, make_msgid
from typing import Optional

logger = logging.getLogger(__name__)


def _smtp_send(subject: str, html: str, text: str, reply_to: Optional[str] = None) -> bool:
    host = os.environ.get("SMTP_HOST")
    port = int(os.environ.get("SMTP_PORT", "587"))
    user = os.environ.get("SMTP_USER")
    pwd = os.environ.get("SMTP_PASS")
    sender = os.environ.get("SMTP_FROM") or user
    to_addr = os.environ.get("NOTIFY_TO")

    if not (host and user and pwd and to_addr):
        logger.warning("SMTP not configured; skipping email send.")
        return False

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = to_addr
    msg["Message-ID"] = make_msgid(domain="bahariglobal.com")
    if reply_to:
        msg["Reply-To"] = reply_to
    msg.set_content(text)
    msg.add_alternative(html, subtype="html")

    try:
        if port == 465:
            ctx = ssl.create_default_context()
            with smtplib.SMTP_SSL(host, port, context=ctx, timeout=15) as server:
                server.login(user, pwd)
                server.send_message(msg)
        else:
            with smtplib.SMTP(host, port, timeout=15) as server:
                server.starttls(context=ssl.create_default_context())
                server.login(user, pwd)
                server.send_message(msg)
        logger.info("Email sent to %s (subject: %s)", to_addr, subject)
        return True
    except Exception as e:  # noqa: BLE001
        logger.exception("Failed to send email: %s", e)
        return False


# --------- Templates ---------
def _wrap(title: str, body_html: str, action_url: Optional[str] = None) -> str:
    cta = (
        f'<p style="margin:24px 0 0;"><a href="{action_url}" style="display:inline-block;background:#C8A24A;color:#0B1B2B;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:600;font-family:Arial,sans-serif;font-size:13px;letter-spacing:0.08em;text-transform:uppercase">Open Admin Dashboard</a></p>'
        if action_url else ""
    )
    return f"""\
<!doctype html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;background:#F6F3EC;font-family:Arial,sans-serif;color:#0B1B2B;">
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    <div style="background:#0B1B2B;color:#F6F3EC;border-radius:12px 12px 0 0;padding:18px 22px;display:flex;align-items:center;gap:12px;">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;letter-spacing:0.04em;">BAHARI</div>
      <div style="font-size:10px;letter-spacing:0.22em;color:#C8A24A;text-transform:uppercase;margin-left:6px;">Global Holdings</div>
    </div>
    <div style="background:#ffffff;border:1px solid rgba(11,27,43,0.10);border-top:none;border-radius:0 0 12px 12px;padding:24px 22px;">
      <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C8A24A;font-weight:600;">New Website Submission</div>
      <h1 style="margin:6px 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#0B1B2B;">{title}</h1>
      {body_html}
      {cta}
      <hr style="border:none;border-top:1px solid rgba(11,27,43,0.08);margin:22px 0 12px;"/>
      <p style="font-size:11px;color:#5b6470;margin:0;">This is an automated notification from bahariglobal.com. Reply directly to contact the sender.</p>
    </div>
  </div>
</body></html>"""


def _row(label: str, value: str) -> str:
    if not value:
        return ""
    return (
        f'<tr><td style="padding:6px 12px 6px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#5b6470;vertical-align:top;white-space:nowrap;">{label}</td>'
        f'<td style="padding:6px 0;font-size:14px;color:#0B1B2B;">{value}</td></tr>'
    )


def render_quote_email(payload: dict, admin_url: str) -> tuple[str, str, str]:
    rows = "".join([
        _row("Company", payload.get("company_name", "")),
        _row("Contact", payload.get("contact_person", "")),
        _row("Email", payload.get("email", "")),
        _row("Phone", payload.get("phone", "")),
        _row("Service", payload.get("service_needed", "")),
        _row("Cargo", payload.get("cargo_type", "")),
        _row("Origin", payload.get("origin", "")),
        _row("Destination", payload.get("destination", "")),
        _row("Notes", (payload.get("notes") or "").replace("\n", "<br>")),
    ])
    body_html = f'<table style="border-collapse:collapse;width:100%;">{rows}</table>'
    html = _wrap("Quote Request", body_html, admin_url)

    text = (
        "New Quote Request\n\n"
        f"Company: {payload.get('company_name','')}\n"
        f"Contact: {payload.get('contact_person','')}\n"
        f"Email: {payload.get('email','')}\n"
        f"Phone: {payload.get('phone','')}\n"
        f"Service: {payload.get('service_needed','')}\n"
        f"Cargo: {payload.get('cargo_type','')}\n"
        f"Origin: {payload.get('origin','')}\n"
        f"Destination: {payload.get('destination','')}\n"
        f"Notes: {payload.get('notes') or ''}\n"
    )
    subject = f"[Bahari] Quote Request — {payload.get('company_name','New')} ({payload.get('service_needed','')})"
    return subject, html, text


def render_contact_email(payload: dict, admin_url: str) -> tuple[str, str, str]:
    rows = "".join([
        _row("Name", payload.get("name", "")),
        _row("Email", payload.get("email", "")),
        _row("Phone", payload.get("phone") or ""),
        _row("Company", payload.get("company") or ""),
        _row("Subject", payload.get("subject", "")),
        _row("Message", (payload.get("message") or "").replace("\n", "<br>")),
    ])
    body_html = f'<table style="border-collapse:collapse;width:100%;">{rows}</table>'
    html = _wrap("Contact Message", body_html, admin_url)
    text = (
        "New Contact Message\n\n"
        f"Name: {payload.get('name','')}\n"
        f"Email: {payload.get('email','')}\n"
        f"Phone: {payload.get('phone','') or ''}\n"
        f"Company: {payload.get('company','') or ''}\n"
        f"Subject: {payload.get('subject','')}\n\n"
        f"Message:\n{payload.get('message','')}\n"
    )
    subject = f"[Bahari] Contact — {payload.get('subject','New Message')} from {payload.get('name','')}"
    return subject, html, text


# --------- Public API ---------
async def send_quote_email_async(payload: dict, admin_url: str = "") -> None:
    try:
        subject, html, text = render_quote_email(payload, admin_url)
        reply_to = payload.get("email")
        await asyncio.to_thread(_smtp_send, subject, html, text, reply_to)
    except Exception as e:  # noqa: BLE001
        logger.exception("send_quote_email_async error: %s", e)


async def send_contact_email_async(payload: dict, admin_url: str = "") -> None:
    try:
        subject, html, text = render_contact_email(payload, admin_url)
        reply_to = payload.get("email")
        await asyncio.to_thread(_smtp_send, subject, html, text, reply_to)
    except Exception as e:  # noqa: BLE001
        logger.exception("send_contact_email_async error: %s", e)
