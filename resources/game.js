(function () {
angular.module('ngNoughtsAndCrosses', [])
    .filter('ViewCounter', function () {
        return function (input) {    
            if (input == '-1') {                
                return 'white';
            }
            else if (input == 1) {
                return 'red'; //$sce.trustAs('<i class="fa fa-circle red" aria-hidden="true">' || 'html', value);
            }
            else if (input == 2) {
                return 'yellow'; //$sce.trustAs('<i class="fa fa-circle yellow" aria-hidden="true">' || 'html', value);
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
            
            //  Data representation of the counters on the board
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
            vm.count = 0;
         
        }

        //  Function that is used to, guess what?
        function CheckWinner (player) {

            
            //  Let's loop horizontally first
            for(var i=0;i<6;i++) {                
                for(var j=0;j<7;j++) {
                    if (vm.Rows[i][j] == player) {
                        vm.count++;                        
                        if (vm.count >= 4) {
                            return true;
                        }
                    }
                    else {
                        vm.count = 0;
                    }
                }
            } 

            //  Let's loop vertically next
            for(var i=0;i<7;i++) {                
                for(var j=0;j<6;j++) {
                    if (vm.Rows[j][i] == player) {
                        vm.count++;
                        if (vm.count >= 4) {
                            return true;
                        }
                    }
                    else {
                        vm.count = 0;
                    }
                }
            } 

            //  Finally, let's loop diagonally

            //  BRAIN IS NOW BROKEN, need to do diagonal now!!!!
            
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
                    vm.GameOver = false;  
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