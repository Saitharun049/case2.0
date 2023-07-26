

const axios = require('axios');
const fs = require("fs");
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
const apiKey = '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';

const prompts = [
    {
      prompt: 'Generate the csv file for 3  employees for june month (30 days) and Marked the Weekend (Saturday and Sunday as 0) having Employee ID as (EMP001,...),Date (DD-MM-YYYY),Day,Time-in (8AM - 10AM),Time-out (5PM-8PM),Total Hours Worked(Hrs)',
      filename:'emp_att_june.csv'
    },
    {
      prompt: 'Generate the csv for employee leave having Employee ID as (EMP001,...),Employee Name,Leave Type(half day,full day),Start Date,End Date,Leave Duration,Leave Status (Approval Status like Approved or Rejected) for June month',
      filename:'emp_leave.csv',
    },
    {
      prompt: 'Generate the csv file for National holidays(as per India calendar)having Date as (DD-MM-YYYY),Day,Holiday Name,Type(Public)',
      filename:'emp_holiday.csv',
    },
    {
      prompt: "Generate the Attendance sheet for 3 employees for june month  in to csv format which contain  headers, Employee Name,Employee Id(EMP001,...),Total Working Day(Calculated),Total Working Hours(Calculated) excluding weekends, holidays(emp_holiday.csv), leaves(emp_leave.csv) and based on number of working days, each day 8 hours being working hours.",
      filename:"emp_result_june.csv"
    },
  ];
  

async function generateChatGPTResponses(prompts) {
  try {
    const headers = {
        Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      
    };

    let cumulativeResponses = '';

    for (const prompt of prompts) {
        console.log(prompt);
      const body = {
        model: "gpt-3.5-turbo",
        messages: [
            {
              role: "user",
              content: prompt.prompt,
            },
          ],
        max_tokens: 3000,
        temperature: 0.2
      };

      const response = await axios.post(apiEndpoint, body, { headers });
      const generatedText = response.data.choices[0].message.content;

      fs.writeFileSync(prompt.filename, generatedText, 'utf8');

        console.log(`CSV file "${prompt.filename}" generated successfully.`);
    }

    return cumulativeResponses;
  } catch (error) {
    console.error('Error generating ChatGPT responses:', error.message);
    throw error;
  }
}


generateChatGPTResponses(prompts);
