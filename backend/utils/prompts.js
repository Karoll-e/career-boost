const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `
    You are an AI trained to generate technical interview questions and answers.
    
    Task:
    - Role: ${role}
    - Candidate Experience: ${experience} years
    - Focus Topics: ${topicsToFocus}
    - Write ${numberOfQuestions} interview questions.
    - For each question, generate a detailed but beginner-friendly answer.
    - If the answer needs a code example, add a small code block inside.
    - Keep formatting very clean.
    - Return a pure JSON array like:
    [
      {
        "question": "Question here?",
        "answer": "Answer here."
      },
      ...
    ]
    Important: Do NOT add any extra text. Only return valid JSON.
    `;

const conceptExplainPrompt = (question) => `
    You are an AI trained to generate comprehensive explanations for interview questions.
    
    Task:
    
    - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
    - Question: "${question}"
    - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
    - If the explanation includes a code example, provide a small code block.
    - At the end, include relevant sources and external learning materials where users can learn more about the topic.
    - Include 3-5 high-quality, relevant sources like official documentation, reputable tutorials, or educational platforms.
    - Keep the formatting very clean and clear.
    - Return the result as a valid JSON object in the following format:
    
    {
        "title": "Short title here",
        "explanation": "Detailed explanation here with markdown formatting.",
        "sources": [
            {
                "title": "Official Documentation",
                "url": "https://example.com/docs",
                "description": "Brief description of what this resource provides"
            },
            {
                "title": "Tutorial/Guide Title",
                "url": "https://example.com/tutorial", 
                "description": "Brief description of what this resource provides"
            }
        ]
    }
    
    Important: 
    - Do NOT add any extra text outside the JSON format. Only return valid JSON.
    - Ensure all URLs are real, working links to reputable sources.
    - Include a mix of documentation, tutorials, and educational content.
    `;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };