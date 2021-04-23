# Vidya ( Virtual Assistant )

Vidya is a Dialogflow based conversational chatbot, designed to streamline the interaction between people and virtual labs services. Vidya enhances user experience through dynamic & efficient simulated chat experience. Vidya is tightly integrated with the analytics [data](https://docs.google.com/spreadsheets/d/1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI/edit?usp=sharing), answering a range of analytics & metrics related questions. 
Vidya consists of both public and private agents. The public bot deployed on [Vlead website](https://vlead.vlabs.ac.in) is trained to answer questions about labs, disciplines, FAQs, workshops, users/views trends, etc. The private bot deployed as part of Slack apps can answer questions related to Dialogflow bot training, agents structure & other private stuff. The public bot is a subset of the private bot, so the slack bot can also answer any of the public questions.

- Deployed Public Bot : [Link](https://vlead.vlabs.ac.in)
- Deployed Private Bot : VLEAD Slack -> Apps -> Vlead-bot


## Repository Structure

    Fulfillments\
        index.js                          Backend code for dialogflow intents
        package.json                       
    Internal-Bot\                         
        agent.json                        Agent Metadata
        package.json                      Agent version info
        intents\                          Intents corresponding to this agent
            ...
    Parent-Bot\                           
        agent.json
        package.json
        intents\
            ...
    Vidya-Public\                         For importing an agent, zip the folder & import it in dialogflow
        agent.json
        package.json
        intents\
            ...
    README.md                             Basic information about the bot usage & development
    
    


## Use Cases

As of now, Vidya covers 150+ conversation scenarios. Following are some of the examples of what Vidya can answer.

### Labs & Disciplines

1. list of labs?
2. list of disciplines?
3. top 5 labs?                  (5 is a parameter)
4. most viewed disciplines?
5. is there cs labs?             (Searching lab by discipline)
6. is there fluids labs?         (Searching lab by topic)

### Metrics

1. total users?
2. total views?
3. users trend?
4. views trend?
5. users from january 1 2021?       (Date should have month, date and year)
6. users till 1/1/2021?             (Date in American format)
7. Views from 1 Feb 2021 for IITR, IIITH and COEP?  (List of colleges is a parameter)
8. views till Oct 1 2020 for all colleges?

### Installation using Virtualbox

1. Install process for virtual labs in virtual box?
2. Sys config for locally running virtual labs?

### Workshops

1. Requirements of an onsite workshop?
2. List of previous workshops?
3. who can request workshop?

### Contact info

1. Virtual Labs Contact info?
2. Social media accounts?

### Dialogflow Development ( Private Bot Specific )

1. adding intent process?
2. agents heirarchy?
3. adding new agent?
4. how to add fullfilment?
5. rich content types?
6. How to add button in dialogflow?


## Development

All of the following information is encoded within the private bot. 

### Agents Heirarchy

Vidya is made up of following three Dialogflow agents.

![Agents Heirarchy](https://i.ibb.co/LY3jWwK/Bots.png "Agents Heirarchy")

1) Parent-Bot: Skeleton bot which redirects requests to children subagents ( Vidya & Private bot ), parent bot can't have its own intents

2) Vidya-Public: Public facing bot, will consists of questions about virtual labs, workshops, FAQs, etc

3) Internal-Bot: Internal bot with coverage of Dialogflow process, internal links, etc

### Dialogflow Steps

[Dialogflow Tutorial](https://cloud.google.com/dialogflow/es/docs/tutorials)

1. [Adding Agent](https://cloud.google.com/dialogflow/es/docs/agents-manage)
2. [Adding Intent](https://cloud.google.com/dialogflow/es/docs/intents-overview)
3. [Adding Fulfillment](https://cloud.google.com/dialogflow/es/docs/quick/fulfillment)

## Future Suggestions

* Building a chatbot is an iterative process, ideally bot admins should periodically check the bot status and update intents accordingly. The existing intents & documentation will be helpful in further bot improvements.
* Bot could handle questions about experiment availability  (eg. Is there a linked list lab?)
