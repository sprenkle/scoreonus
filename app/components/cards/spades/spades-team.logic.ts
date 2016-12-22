import {Setting} from '../../../models/setting';
import {Cell} from '../../../models/cell';

export class SpadesLogic {
  private config: Object;
  private firstBid: number;

  constructor(config: Object) {
    this.config = config;
    this.firstBid = 0;
  }

  private isNilBid(cells: Cell[], bidIndex: number, madeIndex: number): boolean {
    return cells[bidIndex].value === 'N' || cells[bidIndex].value === 'BN';
  }

  private calcScore(cells: Cell[], bidIndex: number, madeIndex: number): number {
    var strBid = cells[bidIndex].value;
    var strMade = cells[madeIndex].value;

    if (strBid == null || strMade == null) return 0;

    if (strBid === 'N') {
      if (strMade === '0') {
        cells[madeIndex].status = 'perfectBid';
        return this.config['nil-made'];
      } else {
        cells[madeIndex].status = 'overBid';
        return this.config['nil-over'] + Number(cells[madeIndex].value);
      }
    }

    if (strBid === 'BN') {
      if (strMade === '0') {
        cells[madeIndex].status = 'perfectBid';
        return this.config['blindNil-made'];
      } else {
        cells[madeIndex].status = 'overBid';
        return this.config['blindNil-over'] + Number(cells[madeIndex].value);
      }
    }
    var bid: number = Number(cells[bidIndex].value);
    var made: number = Number(cells[madeIndex].value);
    if (made === NaN) { made = 0 };
    this.calcBidStatus(cells, madeIndex);
    return this.calcBidMade(bid, made);
  }

  private calcBidMade(bid: number, made: number) {
    if (made < bid) {
      return bid * -10;
    } else if (made === bid) {
      return bid * 10;
    } else if (made > bid) {
      return bid * 10 + (made - bid);
    }
    return 0;
  }

  public calcBidStatus(cells: Cell[], madeIndex: number) {
    if(cells[madeIndex].status === 'notused') return;

    var bid: number = Number(cells[madeIndex - 1].value);
    var made: number = Number(cells[madeIndex].value);
    if (isNaN(made)) return 0;

    if (madeIndex === 3 || madeIndex === 8) {
      if (cells[madeIndex - 2].status === 'notused') {
        bid = bid + Number(cells[madeIndex-3].value);
        made = made + Number(cells[madeIndex-2].value);
      }
    }

    if (made < bid) {
      console.log('MadeIndex=' + madeIndex + 'overbid');
      cells[madeIndex].status = 'overBid';
    } else if (made === bid) {
      console.log('MadeIndex=' + madeIndex + 'perfectBid');
      cells[madeIndex].status = 'perfectBid';
    } else if (made > bid) {
      console.log('MadeIndex=' + madeIndex + 'underBid');
      cells[madeIndex].status = 'underBid';
    }
  }

  private colToPlayer(col: number) {
    if (col <= 1) return 0;
    if (col >= 2 && col <= 3) return 1;
    if (col >= 5 && col <= 6) return 2;
    if (col >= 7 && col <= 8) return 3;
  }

  private nextBidCol(row: number, player: number) {
    return this.playerToBidCol(player + 1);
  }

  private playerToBidCol(player: number) {
    switch (player) {
      case 0: return 0;
      case 1: return 2;
      case 2: return 5;
      case 3: return 7;
    }
  }

  isBid(col: number): boolean {
    if (col === 1 || col == 3 || col == 6 || col == 8) {
      return false;
    }
    return true;
  }

  isCellEditable(cells: Cell[][], row: number, col: number): boolean {
    if ('notused' === cells[row][col].status) return false;

    if (col === 1 || col == 3 || col == 6 || col == 8) {
      console.log('A taken col was selected');
      return this.isAllBidsMade(cells, row);
    }

    var rowFirstBid = (this.firstBid + row) % 4;
    console.log('First bid ' + rowFirstBid);
    for (var i = 0; i < 4; i++) {
      var playerIndex = (i + rowFirstBid) % 4;

      console.log('looking at ' + playerIndex);
      if (cells[row][this.playerToBidCol(playerIndex)].value == null) {
        console.log('player ' + playerIndex + ' is null,  colToPlayer= ' + this.colToPlayer(col));
        if (playerIndex === this.colToPlayer(col)) {
          console.log('This is the col selected, should be good');
          break;
        } else {
          console.log('vlaue was null and not the selected player.')
          return false;
        }
      }
      else {
        console.log('player ' + playerIndex + ' is Not null');
      }
    }

    cells[row][col].status = "";
    var nextPlayer = (this.colToPlayer(col) + 1) % 4;
    var nextPlayerBidCol = this.playerToBidCol(nextPlayer);
    if (cells[row][nextPlayerBidCol].value == null) {
      cells[row][nextPlayerBidCol].status = 'enterdata';
    }
    console.log('default value of true');
    return true;
  }

  isAllBidsMade(cells: Cell[][], row: number) {
    if (cells[row][0].value == null || cells[row][2].value == null ||
      cells[row][5].value == null || cells[row][7].value == null) {
      return false;
    } else {
      return true;
    }
  }

  update(cells: Cell[][], score: Cell[]) {
    score[0].value = 0;
    score[1].value = 0;
    var nullValue = false;
    // Go through each row
    for (var i = 0; i < cells.length; i++) {
      var rowScore: number[] = [];
      var row = cells[i];
      // Checking for null value for creating a new row or not.
      for (var j = 0; j < row.length; j++) {
        if (row[j].value === "" || row[j].value == null) {
          nullValue = true;
        }
      }

      // Checking for Ni have to process player seperately
      if (this.isNilBid(row, 0, 1) || this.isNilBid(row, 2, 3)) {
        rowScore[0] = this.calcScore(row, 0, 1);
        rowScore[0] += this.calcScore(row, 2, 3);
      } else {
        var bid: number = Number(row[0].value) + Number(row[2].value);
        var made: number = Number(row[3].value);
        if (made === NaN) {
          rowScore[0] = 0;
        } else {
          rowScore[0] = this.calcBidMade(bid, made);
          this.calcBidStatus(row, 1);
          this.calcBidStatus(row, 3);
        }
      }

      // Checking for Blind Ni have to process player seperately
      if (this.isNilBid(row, 5, 6) || this.isNilBid(row, 7, 8)) {
        rowScore[1] = this.calcScore(row, 5, 6);
        rowScore[1] += this.calcScore(row, 7, 8);
      } else {
        var bid: number = Number(row[5].value) + Number(row[7].value);
        var made: number = Number(row[8].value);
        if (made === NaN) {
          rowScore[1] = 0;
        } else {
          rowScore[1] = this.calcBidMade(bid, made);
          this.calcBidStatus(row, 6);
          this.calcBidStatus(row, 8);
        }
      }

      // Check if bids are made
      if (this.isAllBidsMade(cells, i)) {
        // Only want to be able to individual taken in if required, example a nil bid
        if (!isNaN(Number(row[0].value)) && !isNaN(Number(row[2].value))) {
          console.log('team 1 not used -----------------------------------');
          row[1].status = 'notused';
          row[1].value = 0;
        }
        if (!isNaN(Number(row[5].value)) && !isNaN(Number(row[7].value))) {
          console.log('team 2 not used');
          row[6].status = 'notused';
          row[6].value = 0;
        }

        // check if taken can be set to enterdata
        if (row[1].value == null && row[1].status == null) row[1].status = 'enterdata';
        if (row[3].value == null && row[3].status == null) row[3].status = 'enterdata';
        if (row[6].value == null && row[6].status == null) row[6].status = 'enterdata';
        if (row[8].value == null && row[8].status == null) row[8].status = 'enterdata';
      }

      // Reset score status
      row[4].status = "";
      row[9].status = "";

      // check for sandbags
      if (this.config['sandbag']) {
        if ((rowScore[0]) % 10 + (Number(score[0].value) % 10) >= 10) {
          rowScore[0] -= 100;
          row[4].status = 'sandbagged';
        }
        if ((rowScore[1]) % 10 + (Number(score[1].value) % 10) >= 10) {
          rowScore[1] -= 100;
          row[9].status = 'sandbagged';
        }
      }

      row[4].value = String(rowScore[0]);
      row[9].value = String(rowScore[1]);

      score[0].value += rowScore[0];
      score[1].value += rowScore[1];
    }
    // Check for if new row is needed
    if (!nullValue) {
      if (this.config['playTo'] <= score[0].value || this.config['playTo'] <= score[1].value) {
        if (score[0].value > score[1].value) {
          score[0].status = 'perfectBid';
          score[1].status = 'overBid';
        } else if (score[0].value < score[1].value) {
          score[1].status = 'perfectBid';
          score[0].status = 'overBid';
        } else {
          score[0].status = 'underBid';
          score[1].status = 'underBid';
        }
      } else
        cells.push(this.getNewRow(cells.length));
    }
  }

  getNewRow(index: number): Cell[] {
    var cells: Cell[] = [];
    for (var j: number = 0; j < 10; j++) {
      cells[j] = new Cell();
      cells[j].editable = true;
      if (j === 4 || j == 9) {
        cells[j].editable = false;
      }
    }

    cells[this.playerToBidCol((this.firstBid + index) % 4)].status = 'enterdata';
    cells[4].value = '0';
    cells[9].value = '0';
    return cells;
  }
}
