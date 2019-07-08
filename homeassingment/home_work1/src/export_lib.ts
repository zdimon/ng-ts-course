export function operation(e) {
      let leftOp = Number($('#leftOp').val());
      let rightOp = Number($('#rightOp').val());
      let operation = $(e.target).text();

      switch (operation) {
        case '-':
          $('#result').val(leftOp - rightOp)
          break;

        case '+':
          $('#result').val(leftOp + rightOp)
          break;

        case '/':
        $('#result').val(leftOp / rightOp)
          break;
          
        case '*':
        $('#result').val(leftOp * rightOp)
          break;
      }

    };
