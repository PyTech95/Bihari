from fastapi import FastAPI, APIRouter, HTTPException, Query, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from email_service import send_quote_email_async, send_contact_email_async  # noqa: E402

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Bahari Global Holdings API", version="1.0.0")
api_router = APIRouter(prefix="/api")


# =========================
# Models
# =========================
class QuoteRequestCreate(BaseModel):
    company_name: str = Field(..., min_length=1, max_length=200)
    contact_person: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    phone: str = Field(..., min_length=4, max_length=40)
    cargo_type: str = Field(..., min_length=1, max_length=200)
    origin: str = Field(..., min_length=1, max_length=200)
    destination: str = Field(..., min_length=1, max_length=200)
    service_needed: str = Field(..., min_length=1, max_length=200)
    notes: Optional[str] = Field(None, max_length=2000)


class QuoteRequest(QuoteRequestCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: Literal["new", "contacted", "closed"] = "new"


class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=40)
    company: Optional[str] = Field(None, max_length=200)
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=4000)


class ContactMessage(ContactMessageCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class NewsletterSubscriberCreate(BaseModel):
    email: EmailStr


class NewsletterSubscriber(NewsletterSubscriberCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class Vessel(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    vessel_type: str  # Multipurpose, RoRo, Landing Craft, Container Feeder, Cargo Barge
    length_m: float
    beam_m: float
    cargo_capacity: str  # e.g., "8,500 DWT" or "450 TEU"
    location: str
    availability: str  # e.g., "Available", "On Charter", "Available Q2 2026"
    year_built: int
    flag: str
    image_url: str
    summary: str


class NewsArticle(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    title: str
    category: str
    excerpt: str
    body_html: str
    image_url: str
    author: str
    published_at: str  # ISO date
    read_minutes: int


class CaseStudy(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    title: str
    sector: str
    region: str
    summary: str
    problem: str
    approach: str
    outcome: str
    image_url: str
    metrics: List[dict]  # [{label, value}]


# =========================
# Seed data (in-memory, returned by GET endpoints)
# =========================
VESSELS_SEED: List[dict] = [
    {
        "id": "vsl-001",
        "name": "MV Bahari Atlas",
        "vessel_type": "Multipurpose",
        "length_m": 138.5,
        "beam_m": 21.0,
        "cargo_capacity": "12,500 DWT",
        "location": "Port of Miami, FL",
        "availability": "Available",
        "year_built": 2018,
        "flag": "Panama",
        "image_url": "https://images.pexels.com/photos/753331/pexels-photo-753331.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "summary": "Versatile multipurpose vessel ideal for project cargo, breakbulk and containerized freight across the Caribbean and Americas trade lanes.",
    },
    {
        "id": "vsl-002",
        "name": "MV Bahari Meridian",
        "vessel_type": "Container Feeder",
        "length_m": 158.0,
        "beam_m": 25.0,
        "cargo_capacity": "720 TEU",
        "location": "Kingston, Jamaica",
        "availability": "On Charter",
        "year_built": 2020,
        "flag": "Marshall Islands",
        "image_url": "https://images.pexels.com/photos/33622086/pexels-photo-33622086.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "summary": "Modern feeder vessel servicing intra-Caribbean container loops with high reefer capacity and quick port turnarounds.",
    },
    {
        "id": "vsl-003",
        "name": "MV Bahari Trident",
        "vessel_type": "RoRo",
        "length_m": 165.0,
        "beam_m": 27.5,
        "cargo_capacity": "1,950 lane meters",
        "location": "Port Everglades, FL",
        "availability": "Available Q2 2026",
        "year_built": 2016,
        "flag": "Liberia",
        "image_url": "https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "summary": "Pure RoRo with heavy-lift ramps suited for rolling stock, project equipment and military/government logistics.",
    },
    {
        "id": "vsl-004",
        "name": "LCT Bahari Coral",
        "vessel_type": "Landing Craft",
        "length_m": 64.0,
        "beam_m": 14.0,
        "cargo_capacity": "650 DWT",
        "location": "Port-au-Prince, Haiti",
        "availability": "Available",
        "year_built": 2014,
        "flag": "Saint Vincent",
        "image_url": "https://images.pexels.com/photos/20216716/pexels-photo-20216716.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "summary": "Shallow-draft landing craft for beach and remote-island logistics across the Caribbean basin.",
    },
    {
        "id": "vsl-005",
        "name": "Bahari Cargo Barge 02",
        "vessel_type": "Cargo Barge",
        "length_m": 90.0,
        "beam_m": 24.0,
        "cargo_capacity": "3,800 DWT",
        "location": "Houston, TX",
        "availability": "Available",
        "year_built": 2012,
        "flag": "USA",
        "image_url": "https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "summary": "Open-deck ocean barge for heavy project cargo, equipment relocation and aggregates within US Gulf and Caribbean.",
    },
    {
        "id": "vsl-006",
        "name": "MV Bahari Polaris",
        "vessel_type": "Multipurpose",
        "length_m": 118.0,
        "beam_m": 18.5,
        "cargo_capacity": "7,200 DWT",
        "location": "Cartagena, Colombia",
        "availability": "Available",
        "year_built": 2019,
        "flag": "Panama",
        "image_url": "https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "summary": "Geared multipurpose vessel with two 80-ton cranes for self-discharge in ports with limited infrastructure.",
    },
]

NEWS_SEED: List[dict] = [
    {
        "id": "news-001",
        "slug": "caribbean-trade-corridor-2026-outlook",
        "title": "Caribbean Trade Corridor: 2026 Outlook for Operators and Cargo Owners",
        "category": "Market Insights",
        "excerpt": "Demand shifts, near-shoring momentum and freight rate normalization are reshaping the Caribbean–Americas trade lanes heading into 2026.",
        "body_html": "<p>The Caribbean–Americas trade corridor is entering a new phase of structural growth driven by near-shoring, energy transition cargo and resilient consumer demand. Bahari Global's operations team expects mid-single-digit volume growth on intra-Caribbean feeder routes through 2026.</p><p>Cargo owners should prepare for tighter capacity in Q2 and Q3 due to dry-docking cycles across the feeder fleet. We recommend forward-committing volumes 60–90 days ahead of peak periods.</p><h3>Key takeaways</h3><ul><li>Feeder capacity tightens between April and September.</li><li>Project cargo demand remains strong in Dominican Republic and Guyana.</li><li>Bunker volatility moderating; ETS-aligned routings expanding.</li></ul>",
        "image_url": "https://images.pexels.com/photos/20216716/pexels-photo-20216716.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "author": "Bahari Research Desk",
        "published_at": "2026-05-12",
        "read_minutes": 6,
    },
    {
        "id": "news-002",
        "slug": "port-of-miami-husbandry-best-practices",
        "title": "Husbandry at Port of Miami: A Playbook for Faster Crew Changes",
        "category": "Operations",
        "excerpt": "A practical guide to expediting crew changes, immigration paperwork and bunkering coordination in South Florida.",
        "body_html": "<p>Crew change orchestration in South Florida hinges on three things: pre-arrival paperwork, immigration coordination and a steady ground transport partner. This guide distills our 2026 playbook for owners and operators calling Port of Miami and Port Everglades.</p><h3>Recommended workflow</h3><ol><li>Submit crew lists 72 hours in advance.</li><li>Confirm shore-pass eligibility with CBP early.</li><li>Coordinate bunkering and provisions on the same call window.</li></ol><p>Done right, owners can compress total turnaround by 30–40%.</p>",
        "image_url": "https://images.unsplash.com/photo-1523564662140-a21551f4c588?auto=format&fit=crop&w=1400&q=80",
        "author": "Captain S. Alarcón",
        "published_at": "2026-04-22",
        "read_minutes": 5,
    },
    {
        "id": "news-003",
        "slug": "project-cargo-renewables-caribbean",
        "title": "Project Cargo for Renewables: Moving Turbines Across the Caribbean",
        "category": "Project Cargo",
        "excerpt": "Heavy-lift, RoRo and landing-craft combinations are unlocking renewables build-outs across small-island states.",
        "body_html": "<p>The renewables build-out across the Caribbean basin is creating an unusually complex logistics challenge: oversized turbine blades, transformers and substation modules must be moved into ports with limited draft and infrastructure.</p><p>Our solution typically blends geared multipurpose vessels with landing craft for last-mile delivery, combined with on-the-ground husbandry to keep the chain moving.</p>",
        "image_url": "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1400&q=80",
        "author": "R. Pereira",
        "published_at": "2026-03-30",
        "read_minutes": 7,
    },
    {
        "id": "news-004",
        "slug": "customs-compliance-2026-update",
        "title": "US Customs & ISF Filing: 2026 Compliance Update",
        "category": "Compliance",
        "excerpt": "What importers should know about ISF, HTS classification accuracy and enforcement trends in 2026.",
        "body_html": "<p>US Customs has intensified focus on ISF accuracy and HTS classification in 2026. Importers using third-party brokers should validate filing accuracy quarterly and align internal SOPs with broker workflows.</p><p>Bahari Global's customs desk provides quarterly compliance reviews for clients with sustained import volume.</p>",
        "image_url": "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1400&q=80",
        "author": "Bahari Compliance Desk",
        "published_at": "2026-02-18",
        "read_minutes": 4,
    },
    {
        "id": "news-005",
        "slug": "freight-market-trends-q1-2026",
        "title": "Freight Market Trends: Q1 2026 Recap and Q2 Forecast",
        "category": "Market Insights",
        "excerpt": "Spot rates softened on transatlantic lanes while intra-Caribbean held firm; here is what we are watching next quarter.",
        "body_html": "<p>Q1 2026 brought modest softening on transatlantic spot rates while intra-Caribbean held firm on tight feeder availability. Our Q2 forecast anticipates a 4–7% uplift on regional rates driven by dry-docking schedules.</p>",
        "image_url": "https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "author": "Bahari Research Desk",
        "published_at": "2026-04-05",
        "read_minutes": 5,
    },
    {
        "id": "news-006",
        "slug": "investor-update-strategic-growth",
        "title": "Investor Update: Strategic Growth Across the Americas",
        "category": "Investor News",
        "excerpt": "Bahari Global expands chartering and port agency footprint across three new ports in the Americas region.",
        "body_html": "<p>Bahari Global Holdings is pleased to announce the expansion of its port agency footprint across three new ports in the Americas. The expansion is aligned with our long-term strategy to build a fully integrated maritime services platform connecting the Caribbean, United States and Latin America.</p>",
        "image_url": "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1400&q=80",
        "author": "Office of the Managing Partner",
        "published_at": "2026-01-15",
        "read_minutes": 3,
    },
]

CASE_STUDIES_SEED: List[dict] = [
    {
        "id": "cs-001",
        "slug": "haiti-disaster-relief-logistics",
        "title": "Disaster Relief Logistics, Haiti",
        "sector": "Government / NGO",
        "region": "Caribbean",
        "summary": "Coordinated relief cargo into Port-au-Prince with landing-craft last-mile delivery.",
        "problem": "A major NGO needed to move 9,400 MT of relief cargo into Haiti within 21 days, with limited port infrastructure and unpredictable security conditions.",
        "approach": "We combined a geared multipurpose vessel from Miami with two landing craft for shallow-draft last-mile delivery, and coordinated husbandry, customs and immigration in parallel.",
        "outcome": "All 9,400 MT delivered within 18 days. Zero security incidents. Cost 12% below client budget.",
        "image_url": "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1400&q=80",
        "metrics": [
            {"label": "Cargo Delivered", "value": "9,400 MT"},
            {"label": "On-Time Delivery", "value": "100%"},
            {"label": "Below Budget", "value": "12%"},
        ],
    },
    {
        "id": "cs-002",
        "slug": "renewables-turbines-dominican-republic",
        "title": "Wind Turbine Project Cargo, Dominican Republic",
        "sector": "Renewables",
        "region": "Caribbean",
        "summary": "Moved 24 wind turbine sets from Europe to a remote DR port using mixed RoRo + project cargo strategy.",
        "problem": "Client needed to move 24 wind turbine sets to a remote port with limited heavy-lift infrastructure on a tight commissioning schedule.",
        "approach": "Chartered a heavy-lift multipurpose vessel for transatlantic leg; coordinated a temporary heavy-lift solution onshore; layered husbandry, customs and inland transport.",
        "outcome": "All 24 sets delivered ahead of schedule with zero damage incidents.",
        "image_url": "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1400&q=80",
        "metrics": [
            {"label": "Turbine Sets", "value": "24"},
            {"label": "Damage Incidents", "value": "0"},
            {"label": "Schedule", "value": "Ahead"},
        ],
    },
    {
        "id": "cs-003",
        "slug": "reefer-program-jamaica",
        "title": "Cold Chain Reefer Program, Jamaica",
        "sector": "Perishables",
        "region": "Caribbean",
        "summary": "Built a weekly reefer feeder loop between South Florida and Kingston.",
        "problem": "A major Caribbean importer required a reliable weekly reefer loop with consistent transit times and cold-chain integrity.",
        "approach": "Deployed a modern feeder vessel with high reefer plug capacity, partnered with bonded warehousing and arranged dedicated husbandry support in both ports.",
        "outcome": "99.4% reefer integrity over 12 months; transit time variance under 6 hours.",
        "image_url": "https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=1400&q=80",
        "metrics": [
            {"label": "Reefer Integrity", "value": "99.4%"},
            {"label": "Weekly Loop", "value": "52 sailings"},
            {"label": "Transit Variance", "value": "< 6h"},
        ],
    },
    {
        "id": "cs-004",
        "slug": "gulf-project-cargo-houston",
        "title": "Gulf-to-Caribbean Project Cargo, Houston",
        "sector": "Oil & Gas",
        "region": "Americas",
        "summary": "Heavy-lift modules moved from Houston to two Caribbean ports on a single barge string.",
        "problem": "Client needed to move four oversized modules (largest 320 MT) on a synchronized schedule across two Caribbean ports.",
        "approach": "Deployed a 90m cargo barge with tug, layered marine insurance, port agency and inland heavy-haul.",
        "outcome": "All four modules delivered on schedule; commissioning began 9 days ahead of plan.",
        "image_url": "https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "metrics": [
            {"label": "Modules Moved", "value": "4"},
            {"label": "Heaviest Lift", "value": "320 MT"},
            {"label": "Schedule", "value": "+9 days early"},
        ],
    },
]


# =========================
# Helpers
# =========================
def _serialize(doc: dict) -> dict:
    """Strip MongoDB _id and coerce datetimes to ISO strings."""
    if not doc:
        return doc
    doc = {k: v for k, v in doc.items() if k != "_id"}
    for k, v in list(doc.items()):
        if isinstance(v, datetime):
            doc[k] = v.isoformat()
    return doc


# =========================
# Endpoints
# =========================
@api_router.get("/")
async def root():
    return {"service": "Bahari Global Holdings API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


# -- Quotes --
@api_router.post("/quotes", response_model=QuoteRequest)
async def create_quote(payload: QuoteRequestCreate, background_tasks: BackgroundTasks):
    obj = QuoteRequest(**payload.model_dump())
    doc = obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.quote_requests.insert_one(doc)
    # Fire-and-forget email notification (does not block the response)
    background_tasks.add_task(send_quote_email_async, obj.model_dump(mode="json"), "")
    return obj


@api_router.get("/quotes", response_model=List[QuoteRequest])
async def list_quotes(limit: int = Query(100, ge=1, le=500)):
    cursor = db.quote_requests.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
    items = await cursor.to_list(limit)
    return [QuoteRequest(**_serialize(i)) for i in items]


# -- Contact --
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactMessageCreate, background_tasks: BackgroundTasks):
    obj = ContactMessage(**payload.model_dump())
    doc = obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contact_messages.insert_one(doc)
    background_tasks.add_task(send_contact_email_async, obj.model_dump(mode="json"), "")
    return obj


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts(limit: int = Query(100, ge=1, le=500)):
    cursor = db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
    items = await cursor.to_list(limit)
    return [ContactMessage(**_serialize(i)) for i in items]


# -- Newsletter --
@api_router.post("/newsletter", response_model=NewsletterSubscriber)
async def create_newsletter(payload: NewsletterSubscriberCreate):
    existing = await db.newsletter_subscribers.find_one({"email": payload.email})
    if existing:
        return NewsletterSubscriber(**_serialize(existing))
    obj = NewsletterSubscriber(**payload.model_dump())
    doc = obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.newsletter_subscribers.insert_one(doc)
    return obj


@api_router.get("/newsletter", response_model=List[NewsletterSubscriber])
async def list_newsletter(limit: int = Query(200, ge=1, le=1000)):
    cursor = db.newsletter_subscribers.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
    items = await cursor.to_list(limit)
    return [NewsletterSubscriber(**_serialize(i)) for i in items]


# -- Vessels --
@api_router.get("/vessels", response_model=List[Vessel])
async def list_vessels(
    vessel_type: Optional[str] = None,
    availability: Optional[str] = None,
):
    items = VESSELS_SEED
    if vessel_type:
        items = [v for v in items if v["vessel_type"].lower() == vessel_type.lower()]
    if availability:
        items = [v for v in items if availability.lower() in v["availability"].lower()]
    return [Vessel(**v) for v in items]


@api_router.get("/vessels/{vessel_id}", response_model=Vessel)
async def get_vessel(vessel_id: str):
    match = next((v for v in VESSELS_SEED if v["id"] == vessel_id), None)
    if not match:
        raise HTTPException(status_code=404, detail="Vessel not found")
    return Vessel(**match)


# -- News --
@api_router.get("/news", response_model=List[NewsArticle])
async def list_news(category: Optional[str] = None, limit: int = Query(20, ge=1, le=100)):
    items = NEWS_SEED
    if category:
        items = [n for n in items if n["category"].lower() == category.lower()]
    return [NewsArticle(**n) for n in items[:limit]]


@api_router.get("/news/{slug}", response_model=NewsArticle)
async def get_news(slug: str):
    match = next((n for n in NEWS_SEED if n["slug"] == slug), None)
    if not match:
        raise HTTPException(status_code=404, detail="Article not found")
    return NewsArticle(**match)


# -- Case Studies --
@api_router.get("/case-studies", response_model=List[CaseStudy])
async def list_case_studies():
    return [CaseStudy(**c) for c in CASE_STUDIES_SEED]


@api_router.get("/case-studies/{slug}", response_model=CaseStudy)
async def get_case_study(slug: str):
    match = next((c for c in CASE_STUDIES_SEED if c["slug"] == slug), None)
    if not match:
        raise HTTPException(status_code=404, detail="Case study not found")
    return CaseStudy(**match)


# -- Admin (no auth - simple read of submissions) --
@api_router.get("/admin/submissions")
async def admin_submissions(limit: int = Query(100, ge=1, le=500)):
    quotes_c = db.quote_requests.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
    contacts_c = db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
    subs_c = db.newsletter_subscribers.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
    quotes = [_serialize(d) for d in await quotes_c.to_list(limit)]
    contacts = [_serialize(d) for d in await contacts_c.to_list(limit)]
    subs = [_serialize(d) for d in await subs_c.to_list(limit)]
    return {
        "quote_requests": quotes,
        "contact_messages": contacts,
        "newsletter_subscribers": subs,
        "counts": {
            "quote_requests": len(quotes),
            "contact_messages": len(contacts),
            "newsletter_subscribers": len(subs),
        },
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
