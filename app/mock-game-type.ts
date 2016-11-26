import { GameType } from './models/game-type';

export var GAMETYPES: GameType[] = [
    {
      "id": "1",
      "category": "Cards",
      "description": "Sprenkle family Pinochle rules!",
      "name": "Pinochle",
      "subtype": "2 Team 4 Player",
      "configuration": "{\n    \"numSections\":4, \n    \"section0\":\"Bid\", \n    \"section1\":\"Meld\",\n    \"section2\":\"Taken\",\n    \"section3\":\"Score\",\n\t\"sectionEdit0\": true,\n    \"sectionEdit1\": true,\n\t\"sectionEdit2\": true,\n    \"sectionEdit3\": false,\n    \"numRounds\": 1,\n    \"numRowsPerRound\":1\n}",
      "teamSetup": "1",
      "input": "number-pad",
      "gameLogic": "bid-meld-trick",
      "layout": "grid-layout",
      "link": null
    },
    {
      "id": "2",
      "category": "Cards",
      "description": "Typical Hearts rules",
      "name": "Hearts",
      "subtype": "2 Team 4 Player",
      "configuration": "{\n    \"numSections\":4, \n    \"section0\":\"Bid\", \n    \"section1\":\"Meld\",\n    \"section2\":\"Taken\",\n    \"section3\":\"Score\",\n\t\"sectionEdit0\": true,\n    \"sectionEdit1\": true,\n\t\"sectionEdit2\": true,\n    \"sectionEdit3\": false,\n    \"numRounds\": 1,\n    \"numRowsPerRound\":1\n}",
      "teamSetup": "1",
      "input": "number-pad",
      "gameLogic": "bid-meld-trick",
      "layout": "grid-layout",
      "link": null
    },
    {
      "id": "3",
      "category": "Cards",
      "description": "Official Wizard rules",
      "name": "Wizard",
      "subtype": "2 Team 4 Player",
      "configuration": "{\n    \"numSections\":4, \n    \"section0\":\"Bid\", \n    \"section1\":\"Meld\",\n    \"section2\":\"Taken\",\n    \"section3\":\"Score\",\n\t\"sectionEdit0\": true,\n    \"sectionEdit1\": true,\n\t\"sectionEdit2\": true,\n    \"sectionEdit3\": false,\n    \"numRounds\": 1,\n    \"numRowsPerRound\":1\n}",
      "teamSetup": "1",
      "input": "number-pad",
      "gameLogic": "bid-meld-trick",
      "layout": "grid-layout",
      "link": null
    },
    {
      "id": "4",
      "category": "Cards",
      "description": "Typical Spades rules",
      "name": "Spades",
      "subtype": "2 Team 4 Player",
      "configuration": "{\n    \"numSections\":5, \n    \"section0\":\"Bid\", \n    \"section1\":\"Taken\",\n    \"section2\":\"Bid\", \n    \"section3\":\"Taken\",\n    \"section4\":\"Score\",\n\t\"sectionEdit0\": true,\n    \"sectionEdit1\": true,\n\t\"sectionEdit2\": true,\n    \"sectionEdit3\": true,\n    \"sectionEdit4\": false,\n    \"numRounds\": 1,\n    \"numRowsPerRound\":1\n}",
      "teamSetup": "1",
      "input": "cards.input.spades-input",
      "gameLogic": "cards.spades-logic",
      "layout": "table-layout",
      "link": null
    }
  ];
