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
4. [Entities](https://cloud.google.com/dialogflow/es/docs/entities-overview)

### Rich Content Syntax

Following are the rich content types available in Dialogflow messenger along with example & syntax

#### 1. Info/Card

![Info Sample](https://cloud.google.com/dialogflow/es/docs/images/integrations/dialogflow-messenger/info-item.png "Info Sample")

```
 {    
 "richContent": [    
   [    
     {
       "type": "info",    
       "title": "Info item title",    
       "subtitle": "Info item subtitle",    
       "image": {    
         "src": {    
           "rawUrl": "https://example.com/images/logo.png"    
         }    
       },    
       "actionLink": "https://example.com"    
     }    
   ]    
 ]    
}
```

#### 2. Description

![Description Sample](https://cloud.google.com/dialogflow/es/docs/images/integrations/dialogflow-messenger/description-item.png "Description Sample")

```
{
 "richContent": [
   [
     {
       "type": "description",
       "title": "Description title",
       "text": [
         "This is text line 1.",
         "This is text line 2."
       ]
     }
   ]
 ]
}
```

#### 3. Image

![Image Sample](https://cloud.google.com/dialogflow/es/docs/images/integrations/dialogflow-messenger/image-item.png)

```
{
 "richContent": [
   [
     {
       "type": "image",
       "rawUrl": "https://example.com/images/logo.png",
       "accessibilityText": "Example logo"
     }
   ]
 ]
}
```

#### 4. Button

![Button Sample](https://cloud.google.com/dialogflow/es/docs/images/integrations/dialogflow-messenger/button-item.png)
```
{
 "richContent": [
   [
     {
       "type": "button",
       "icon": {
         "type": "chevron_right",
         "color": "#FF9800"
       },
       "text": "Button text",
       "link": "https://example.com",
       "event": {
         "name": "",
         "languageCode": "",
         "parameters": {}
       }
     }
   ]
 ]
}
```

#### 5. List

![List Sample](https://cloud.google.com/dialogflow/es/docs/images/integrations/dialogflow-messenger/list-item.png)

```
{
 "richContent": [
   [
     {
       "type": "list",
       "title": "List item 1 title",
       "subtitle": "List item 1 subtitle",
       "event": {
         "name": "",
         "languageCode": "",
         "parameters": {}
       }
     },
     {
       "type": "divider"
     },
     {
       "type": "list",
       "title": "List item 2 title",
       "subtitle": "List item 2 subtitle",
       "event": {
         "name": "",
         "languageCode": "",
         "parameters": {}
       }
     }
   ]
 ]
}
```

#### 6. Accordion

![Accordion Image](https://cloud.google.com/dialogflow/es/docs/images/integrations/dialogflow-messenger/accordion-item.png)
```
{
 "richContent": [
   [
     {
       "type": "accordion",
       "title": "Accordion title",
       "subtitle": "Accordion subtitle",
       "image": {
         "src": {
           "rawUrl": "https://example.com/images/logo.png"
         }
       },
       "text": "Accordion text"
     }
   ]
 ]
}
```

#### 7. Suggestion Chips

![Chips Image](https://cloud.google.com/dialogflow/es/docs/images/integrations/dialogflow-messenger/chip-item.png)
```
{
 "richContent": [
   [
     {
       "type": "chips",
       "options": [
         {
           "text": "Chip 1",
           "image": {
             "src": {
               "rawUrl": "https://example.com/images/logo.png"
             }
           },
           "link": "https://example.com"
         },
         {
           "text": "Chip 2",
           "image": {
             "src": {
               "rawUrl": "https://example.com/images/logo.png"
             }
           },
           "link": "https://example.com"
         }
       ]
     }
   ]
 ]
}
```
