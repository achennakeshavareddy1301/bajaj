const isAlphabetic = (s) => typeof s === 'string' && /^[A-Za-z]+$/.test(s);
const isNumericString = (s) => typeof s === 'string' && /^[0-9]+$/.test(s);

const toAlternatingCapsOnReverse = (str) => {
  const rev = str.split('').reverse().join('');
  let out = '';
  for (let i = 0; i < rev.length; i++) {
    out += i % 2 === 0 ? rev[i].toUpperCase() : rev[i].toLowerCase();
  }
  return out;
};
const processData = (req, res) => {
  try {
    if (!req.body || !Array.isArray(req.body.data)) {
      return res.status(200).json({
        is_success: false,
        user_id: 'your_fullname_ddmmyyyy',
        email: 'your_email@example.com',
        roll_number: 'YOUR_ROLL_NUMBER',
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: '0',
        concat_string: ''
      });
    }
    const { data } = req.body;
    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sumNumbers = 0;
    let concatAlphaRaw = '';
    for (const item of data) {
      const s = typeof item === 'string' ? item : String(item);
      if (isAlphabetic(s)) {
        alphabets.push(s.toUpperCase()); // uppercase in output
        concatAlphaRaw += s; // raw order, unmodified case for later concatenation processing
        continue;
      }
      if (isNumericString(s)) {
        const n = Number(s);
        sumNumbers += n;
        if (n % 2 === 0) {
          even_numbers.push(s);
        } else {
          odd_numbers.push(s);
        }
        continue;
      }
      special_characters.push(s);
    }

    const concat_string = toAlternatingCapsOnReverse(concatAlphaRaw);
    const response = {
      is_success: true,
      user_id: 'ayyaluri_chennakeshava_reddy_14102005', 
      email: 'ayyaluri.chenna2022@vitstudent.ac.in',    
      roll_number: '22blc1301',    
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sumNumbers),
      concat_string
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(200).json({
      is_success: false,
      user_id: 'ayyaluri_chennakeshava_reddy_14102005',
      email: 'ayyaluri.chenna2022@vitstudent.ac.in',
      roll_number: '22blc1301',
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: '0',
      concat_string: '',
      error: 'Unhandled error'
    });
  }
};

module.exports = { processData };
