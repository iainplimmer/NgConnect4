(function () {
angular.module('ngNoughtsAndCrosses', [])
    .filter('ViewCounter', function () {
        //  This filter is used to return the name to show the class on the screen for the counter colour        
        return function (input) {    
            if (input == '-1') {                
                return 'white';
            }
            else if (input == 1) {
                return 'red'; 
            }
            else if (input == 2) {
                return 'yellow'; 
            }
            else {
                return input;
            }
        }
    })
    .controller('ctrl', function () {
        var vm = this;    
   
        //  Let's initialise the board here with the game status, turn, player number and some messages
        vm.ResetGame = function () {
            
            //  Data representation of the counters on the board, basically an array of arrays.
            //  [0][0] is bottom left.
            vm.Rows = [ 
                ['-1','-1','-1','-1','-1','-1','-1'],
                ['-1','-1','-1','-1','-1','-1','-1'],
                ['-1','-1','-1','-1','-1','-1','-1'],
                ['-1','-1','-1','-1','-1','-1','-1'],
                ['-1','-1','-1','-1','-1','-1','-1'],
                ['-1','-1','-1','-1','-1','-1','-1'],
            ];
            
            vm.GameOver = false;
            vm.Player = '1';
            vm.Message = '';   
            vm.TurnNumber = 0;
            vm.ShowModal = false;   
         
        }

        //  Function that is used to, guess what?
        function CheckWinner (player) {

            /*      THIS WAS THE ORIGINAL ALGORITHM AND IT WORKS HORIZONTALLY AND VERTICALLY
                    BUT FOUND THAT THE DIAGONAL WAS CONFUSING TO TEST, SO I'VE READJUSTED THE
                    ALGORITHM TO BE MORE EXPRESSIVE RATHER THAN MATHEMATICAL :)

            for(var i=0;i<6;i++) {                
                for(var j=0;j<7;j++) {
                    if (vm.Rows[i][j] == player) {
                        vm.count++;                        
                        if (vm.count >= 4) {
                            console.log('horzontal win');
                            return true;
                        }
                    }
                    else {
                        vm.count = 0;
                    }
                }
            }*/ 

            //  Finally, let's work our way over each cell to check for a winner in one step now.
            //  We start at the bottom left, and work to our top right, we don't ignore impossible
            //  options for winning as this allows us to expand the connect four grid if we want. 
            
            for(var r=0;r<6;r++) {                
                for(var c=0;c<7;c++) {        

                    //  Horizonal win check
                    if (vm.Rows[r][c] == player &&
                        vm.Rows[r][c+1] == player &&
                        vm.Rows[r][c+2] == player &&
                        vm.Rows[r][c+3] == player) {
                        return true;
                    }

                    //  Now the vertical
                    if (vm.Rows[r][c] == player &&
                        (typeof vm.Rows[r+1] !== 'undefined') && vm.Rows[r+1][c] == player &&
                        (typeof vm.Rows[r+2] !== 'undefined') && vm.Rows[r+2][c] == player &&
                        (typeof vm.Rows[r+3] !== 'undefined') && vm.Rows[r+3][c] == player) {
                        return true;
                    }
                    
                    //  Diagonal, up to the right
                    if (vm.Rows[r][c] == player &&
                        (typeof vm.Rows[r+1] !== 'undefined') && vm.Rows[r+1][c+1] == player &&
                        (typeof vm.Rows[r+2] !== 'undefined') && vm.Rows[r+2][c+2] == player &&
                        (typeof vm.Rows[r+3] !== 'undefined') && vm.Rows[r+3][c+3] == player) {
                        return true;
                    }

                    //  Diagonal, down to the right
                    if (vm.Rows[r][c] == player &&
                        (typeof vm.Rows[r-1] !== 'undefined') && vm.Rows[r-1][c+1] == player &&
                        (typeof vm.Rows[r-2] !== 'undefined') && vm.Rows[r-2][c+2] == player &&
                        (typeof vm.Rows[r-3] !== 'undefined') && vm.Rows[r-3][c+3] == player) {
                        return true;
                    }                    
                    
                }
            }
            return false;
        }

        //  Event that is fired when the player takes a turn
        vm.TakeTurn = function (e) {                       
            if (!vm.GameOver) {
                //  Place the counter on the board, let's loop over the rows
                var turnTaken = false;                
                for(var i=0;i<6;i++){
                    if (vm.Rows[i][e] === '-1') {
                        vm.Rows[i][e] = vm.Player;
                        turnTaken = true;                        
                        vm.TurnNumber++;
                        break;
                    }                                          
                }

                //  Check to see if it was a winning turn with this matrix
                if (CheckWinner(vm.Player)) {
                    vm.Message = 'Player ' + vm.Player + ' is the winner :)';
                    vm.GameOver = true;
                    vm.ShowModal = true;
                }

                if (vm.GameOver) {
                    //vm.GameOver = false;  
                    vm.ShowModal = true;
                }
                else if (vm.TurnNumber == (6*7)) {
                    vm.Message = 'It\'s a draw, baby!';
                    vm.GameOver = true;
                    vm.ShowModal = true;
                }
                else if (!vm.GameOver && turnTaken) {
                    // It's the next turn then!  
                    vm.Player = (vm.Player == '1') ? '2' : '1';
                }
                
            }
        }

    })
})();