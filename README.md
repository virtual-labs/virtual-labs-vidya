# Vidya ( Virtual Assistant )

Vidya is a Dialogflow based conversational chatbot, designed to streamline the interaction between people and virtual labs services. Vidya enhances user experience through dynamic & efficient simulated chat experience. 

Vidya is tightly integrated with the analytics [data](https://docs.google.com/spreadsheets/d/1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI/edit?usp=sharing), answering a range of analytics & metrics related questions. 

Vidya consists of both public and private agents. The public bot deployed on [Vlead website](https://vlead.vlabs.ac.in) is trained to answer questions about labs, disciplines, FAQs, workshops, users/views trends, etc. The private bot deployed as part of Slack apps can answer questions related to Dialogflow bot training, agents structure & other private stuff. The public bot is a subset of the private bot, so the slack bot can also answer any of the public questions.

- Deployed Public Bot : [Link](https://vlead.vlabs.ac.in)
- Deployed Private Bot : VLEAD Slack -> Apps -> Vlead-bot


## Repository Structure


    fulfillments\
        index.js                          Backend code for dialogflow intents
        package.json                       
    internal-bot\                         
        agent.json                        Agent Metadata
        package.json                      Agent version info
        intents\                          Intents corresponding to this agent
            ...
    parent-bot\                           
        agent.json
        package.json
        intents\
            ...
    vidya-public\                         For importing an agent, zip the folder & import it in dialogflow
        agent.json
        package.json
        customSmalltalkResponses_en.json  Small talk responses (Small talk only available in public bot)  
        intents\
            ...
    test-app\                             A test node application to test Google Sheets API calls before adding onto fulfillments
        index.js
        package.json
    README.md                             Basic information about the bot usage
    CONTRIBUTING.md                       Information regarding dialogflow development
    
    
### Agents

* Internal Bot: Private bot consisting of only private intents
* Vidya Public: Public bot consisting of only public intents
* Parent Bot: Placeholder agent acting as parent of above two agents

#### Importing agent

For importing any of the agents, compress their corresponding folder into zip & follow these steps

1. Go to the Dialogflow console and click the ⚙icon next to your Dialogflow agent name.
2. Click to Export and Import tab in the settings of your Dialogflow agent and click IMPORT FROM ZIP.
3. Drag the ZIP file into the box and type the word IMPORT to complete the import

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
7. syntax for info type?

### Misc

1. analytics page?
2. Virtual Labs contribution process?
3. How do I start developing virtual labs experiments
4. Hosting info?
5. Link for Virtual Labs FAQ?
6. Workshop FAQs?
7. Tips for using virtual lab?
8. Outreach info?
9. Workshop fees for college?

## Development

Check out [CONTRIBUTING.md](https://github.com/virtual-labs/virtual-labs-vidya/blob/main/CONTRIBUTING.md) for details regarding development of bot

## Future Suggestions

* Building a chatbot is an iterative process, ideally bot admins should periodically check the bot status and update intents accordingly. The existing intents & documentation will be helpful in further bot improvements.
* Bot could handle questions about experiment availability  (eg. Is there a linked list lab?)
