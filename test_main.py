import pytest
from fastapi.testclient import TestClient
from main import app, ELECTION_DATA

client = TestClient(app)

def test_health_check():
    """Validates the health check endpoint returns 200 OK."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_get_election_info_valid_usa():
    """Validates get_election_info returns correct data for a valid USA state."""
    from main import get_election_info
    result = get_election_info("USA", "TX")
    assert result["deadline"] == "Oct 5, 2026"
    assert "votetexas.gov" in result["link"]

def test_get_election_info_valid_india():
    """Validates get_election_info returns correct data for a valid Indian state."""
    from main import get_election_info
    result = get_election_info("INDIA", "TN")
    assert "Mar 2026" in result["deadline"]
    assert "eci.gov.in" in result["link"]

def test_get_election_info_invalid_country():
    """Validates get_election_info handles unknown countries gracefully."""
    from main import get_election_info
    result = get_election_info("FRANCE", "PARIS")
    assert result == {"error": "Country not found"}

def test_get_election_info_invalid_region():
    """Validates get_election_info handles unknown regions within a valid country."""
    from main import get_election_info
    result = get_election_info("USA", "XYZ")
    assert result == {"error": "Region not found"}

def test_chat_endpoint_basic():
    """Validates the chat endpoint accepts requests and returns expected structure."""
    payload = {
        "user_id": "test_user",
        "message": "hello",
        "state": "",
        "country": ""
    }
    # Mocking Gemini response is complex, but we can verify the API structure
    # and that it returns options for a new user.
    response = client.post("/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data
    assert "next_node" in data
    assert "options" in data
    assert "USA" in data["options"]

def test_chat_endpoint_with_country():
    """Validates the chat endpoint provides state options when country is provided."""
    payload = {
        "user_id": "test_user",
        "message": "I am in USA",
        "state": "",
        "country": "USA"
    }
    response = client.post("/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "TX" in data["options"]
