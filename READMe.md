# Test MyCover.ai Node.js SDK

A test project for 

## Running locally

Following the last step from the lab SDK, open this project and run:

```bash
npm install
```

then...

```bash
npm run dev
```

## Testing endpoints

- `GET localhost:9000/all-products` fetches all products.
- `POST localhost:9000/purchase/custodian-comprehensive` creates a purchase for Custodian Comprehensive.

Use this payload to create the purchase:

```json
{
  "vehicle_make": "1",
  "vehicle_model": "218",
  "address": "close 4 festac town lagos",
  "insurance_start_date": "2022-12-08",
  "vehicle_registration_number": "akd543gf",
  "engine_number": "2GR0455283",
  "chassis_number": "JTNBK40K303034861",
  "vehicle_year_manufactured": "2019",
  "vehicle_type": "Suv",
  "vehicle_color": "RED",
  "vehicle_insurance_type": "Private",
  "vehicle_value": 3000000,
  "first_name": "peter",
  "last_name": "akinwumi",
  "email": "peter.akinwumi@gmail.com",
  "dob": "1987-04-28",
  "phone": "07064378577",
  "product_id": "f1b14adb-f9ed-4541-894d-8ab137f048a2"
}
```
