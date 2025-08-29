<img width="1106" height="334" alt="Screenshot 2025-08-29 111225" src="https://github.com/user-attachments/assets/974abdbb-aa1b-4b0e-b50b-65d07e3a9979" />
<img width="1505" height="377" alt="Screenshot 2025-08-29 114624" src="https://github.com/user-attachments/assets/e0733fb4-f670-4e43-84db-cefb35259bd2" />
<img width="1282" height="591" alt="Screenshot 2025-08-29 115522" src="https://github.com/user-attachments/assets/ca034be5-c62f-4cfb-a328-9d31d524368f" />
BFHL REST API (Node.js + Express on Vercel)
A single-endpoint REST API that accepts a JSON payload with an array and returns:

Status flag (is_success)

user_id in full_name_ddmmyyyy format (lowercase)

Email and College Roll Number

Arrays of odd/even numbers (as strings)

Array of alphabets (uppercased)

Array of special characters

Sum of numeric items (as a string)

Concatenation of all alphabetic characters, reversed with alternating caps

This meets the VIT BFHL problem requirements (POST /bfhl, 200 on success, strict output formatting).

Tech stack
Node.js

Express

Deployed as a serverless function on Vercel

Live endpoint
POST: https://bajaj-rouge-three.vercel.app/bfhl

Note: Visiting the URL in a browser issues a GET and shows “Cannot GET /bfhl”. Use POST with a JSON body.

Request format
Content-Type: application/json

Body:

json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
Response format (example)
json
{
  "is_success": true,
  "user_id": "ayyaluri_chennakeshava_reddy_14102005",
  "email": "ayyaluri.chenna2022@vitstudent.ac.in",
  "roll_number": "22blc1301",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
Rules:

Numbers in arrays are strings (“334”, “4”, “1”).

Alphabets are uppercased in the alphabets array.

sum is a string.

concat_string is built from all alphabet tokens in input order, reversed, then alternating caps (index 0 upper, 1 lower, …).

How to run locally
Prerequisites: Node.js (v16+ recommended)

Install dependencies:

bash
npm install
Start local server (index.js):

bash
npm run start
# or with nodemon (if configured)
npm run dev


Push to GitHub; import repo in Vercel → Deploy. Each push triggers auto-deployment.

Controller logic summary
Classify each token (string coercion applied):

/^[A-Za-z]+$/ → alphabets (push uppercased; also append original-case to concatenation buffer)

/^[0-9]+$/ → numbers (sum as number, parity decides odd/even arrays; push original string)

else → special_characters (push original token)

After loop:

Reverse the concatenation buffer, apply alternating caps (0 upper, 1 lower, …).

Return status 200 with is_success true. On validation error (no data array), return is_success false with empty arrays and sum "0".

Examples to test
A:

json
{ "data": ["a","1","334","4","R","$"] }
Expected:

odd_numbers: ["1"]

even_numbers: ["334","4"]

alphabets: ["A","R"]

special_characters: ["$"]

sum: "339"

concat_string: "Ra"

B:

json
{ "data": ["2","a","y","4","&","-","*","5","92","b"] }
Expected:

odd_numbers: ["5"]

even_numbers: ["2","4","92"]

alphabets: ["A","Y","B"]

special_characters: ["&","-","*"]

sum: "103"

concat_string: "ByA"

C:

json
{ "data": ["A","ABcD","DOE"] }
Expected:

odd_numbers: []

even_numbers: []

alphabets: ["A","ABCD","DOE"]

special_characters: []

sum: "0"

concat_string: "EoDdCbAa"



.
├─ api/
│  └─ index.js
├─ controllers/
│  └─ bfhlController.js
├─ index.js       
├─ package.json
├─ vercel.json     
└─ README.md
