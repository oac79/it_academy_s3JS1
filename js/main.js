$(document).ready(function () {
    /*OPERADORES +*-/ **/
    /*NUMEROS 0-9 */
    /*DECIMAL . */
    /*IGUAL = */
    var n1 = ''
    var operator = '';
    var n2 = '';
    var data_in = $('.calculator-screen').attr('value');

    /*GET VALUE BUTTON */
    $('.btn').click(function () {

        //Obtenemos el valor del boton clickado
        var data_btn = $(this).attr('value');
        console.log('data_in= ' + data_in);
        console.log('data_btn= ' + data_btn);

        //Verificamos el tipo de dato (Numeric Decimal Operator Reset Delete)
        if ($.isNumeric(data_btn)) {
            $('#btn-decimal').prop('disabled', false);
            if (data_in == '0' && data_in.length == 1) {
                $('.calculator-screen').val(data_btn);
                data_in = data_btn;
            } else if (operatorExist()) {
                $('.calculator-screen').val(data_in.concat(data_btn));
                data_in = data_in.concat(data_btn);
                // alert(data_in);
                n2 = n2.concat(data_btn);
                // alert('IS NUMERIC res---> n2 -----> CONCAT-----> ' + n2);
            } else {
                $('.calculator-screen').val(data_in.concat(data_btn));
                data_in = data_in.concat(data_btn);
            }
            //Verificamos si quiere añadir decimales (.)
        } else if (data_btn == '.') {
            if (operatorExist()) {
                console.log('n2 entra en decimal  ' + n2);
                n2 = n2.concat(data_btn);
                // alert('IS DECIMAL entra en el DECIM____> N2 => ' + n2)
            }
            $('.calculator-screen').val(data_in + '' + data_btn);
            $('#btn-decimal').prop('disabled', true);
            data_in = data_in.concat(data_btn);

            //Verificamos si quiere añadir un operador (+ * / -)
        } else if (data_btn == '+' || data_btn == '-' || data_btn == '*' || data_btn == '/') {
            n1 = data_in;
            operator = data_btn;
            // alert('n1 -----> ' + n1 + ' OPERATOR ----> ' + operator);
            $('.calculator-screen').val(data_in.concat(data_btn));
            data_in = data_in.concat(data_btn);
        } else if (data_btn == 'clear') {
            $('.calculator-screen').val('0');
            data_in = '0';
            n1 = '';
            n2 = '';
            operator = '';
        } else if (data_btn == 'backspace') {
            if (data_in.length == 1 || data_in.length == 0) {
                // console.log('entra en backspace enta en el if-----> ' + data_in);
                $('.calculator-screen').val('0');
                data_in = '';
            } else {
                // console.log('data_in replace backspace entra en el else-----> ' + data_in);
                data_in = data_in.replace(data_in.charAt(data_in.length - 1), '');
                $('.calculator-screen').val(data_in);
            }
        } else if (data_btn == 'result') {
            // console.log('OBTENER EL RESULTADO DE LA OPERACIÓN Y MOSTRAR EL RESULTADO');
            // console.log('n1-' + n1 + ' operador ' + operator + ' n2-' + n2);
            data_in = calculator(n1, operator, n2);
            if (data_in == 'err') {
                $('.calculator-screen').val('0');
                data_in = '0';
                alert('ERROR! no se puede dividir enter 0');
            } else {
                $('.calculator-screen').val(data_in);
                n1 = data_in;
                n2 = '';
                operator = '';
            }
            // alert(data_in + '-------' + n1);
        }
    });

    function operatorExist() {
        return data_in.lastIndexOf('+') > 0 || data_in.lastIndexOf('-') > 0
            || data_in.lastIndexOf('*') > 0 || data_in.lastIndexOf('/') > 0;
    }

    function calculator(n1, operator, n2) {
        let res;
        n1 = parseFloat(n1);
        n2 = parseFloat(n2);
        if (operator == '+') {
            res = n1 + n2;
        } else if (operator == '-') {
            res = n1 - n2;
        } else if (operator == '*') {
            res = n1 * n2;
        } else if (operator == '/') {
            if (!Number.isFinite(n1 / n2)) {
                return 'err';
            }
            res = n1 / n2;
        } else {
            return 'El operador introducido no existe';
        }
        return res;
    }
}
);