from langchain_google_genai import GoogleGenerativeAI
from typing import List

from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field


class Answer(BaseModel):
    answer: str = Field(description="answer in markdown format for the question asked")
    follow_up_question: str = Field(description="5 follow-up questions based on the answer")

def chatbot(question):
    # question = input("Enter the question: ")
    prompt = "Generate the response in JSON format with keys answer and follow-up-questions for the following question: \n "

    training_data = f"""You are an assistant for charity service portal, your job is to understand user concerns and provide information and suggestions to user query, you can suggest user which charity to donate to based on there preference and liking

    {question}
    """

    parser = JsonOutputParser(pydantic_object=Answer)

    prompt = PromptTemplate(
        template="Answer the user query.\n{format_instructions}\n{query}\n",
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    llm = GoogleGenerativeAI(model="gemini-pro", google_api_key="AIzaSyD43qPnjCN3Kv2DrJe1VZSczZYCiw0w2LM")

    chain = prompt | llm | parser

    response = chain.invoke({"query": training_data})

    return response

print(chatbot("tell me about the charities that work on environment"))