let KeyPad = document.querySelectorAll('.KeyNumber');
let KeyOper = document.querySelectorAll('.Operlater');
let TextDisplay = document.querySelector('.cal-info');
let key_result = document.querySelector('.result');
let display_result = document.querySelector('.display_result');
let Keyclear = document.querySelector('.clear');
let KeyBack = document.querySelector('.Back');
let KeyFloat = document.querySelector('.float');

const Numberpad = ['7','8','9','6','5','4','3','2','1','0'];
const Operpad = ['+','-','x','÷','%']

let Time = []; // 타임라인
let num = []; // 숫자 입력값
let oper;
let res;
let plusres;

let cal = ''; //display 보여주기
let c = 0; // 숫자 찾기 카운트
let count_a = 0; //계산용 카운트
let count_b = 0; // 답 구하는 카운트 ex) 9+=
let count_f = 0; // 소수점 카운트

for(let i = 0; i < KeyPad.length; i++){
    KeyPad[i].addEventListener('click',()=>{
        if(res != null && count_a == 2) {
            cal = '';
            res = null;
            count_a = 0;
        }
        if(count_b == 1){
            count_b = 0;
        }
            cal+=(Numberpad[i]);
            num.push(Numberpad[i]);
            TextDisplay.value = cal;
    });
}

// 연산자 입력
for(let j = 0; j < KeyOper.length; j++){
    KeyOper[j].addEventListener('click', ()=>{
        if(count_b == 1){
            count_f = 0;
            count_b = 0;
            num = [];
        }
        oper = null;
    if(num.length != 0 && oper == null && res == null && count_a == 0){
        count_f = 0;
        // 일반 계산
        cal+=(Operpad[j]);
        num.push(Operpad[j]);
        TextDisplay.value = cal;
        count_a = 1;
        console.log('1번 연산')
    } else if(count_a == 1){
        // 연속 연산
        count_f = 0;
        calculation();
        res = Number(res.toFixed(1));
        cal = '';
        cal+= res+Operpad[j];
        TextDisplay.value = cal;
        display_result.innerHTML = res;
        // 초기화
        num = [];
        oper = null;
        num.push(res);
        num.push(Operpad[j]);
        console.log('2번 연산')
    } else if(count_a == 2){
        // 값 구한후 계산
        count_f = 0;
        cal = '';
        cal+=res+Operpad[j];
        res = String(res);
        res = res.split("");
        for(let i = 0; i < res.length; i++){
        num.push(res[i]);
        }
        num.push(Operpad[j]);
        TextDisplay.value = cal;
        // res = null;
        count_a = 1;
        console.log('3번 연산')
    }
    // 연산자 저장
    oper = Operpad[j];
    });
}

// 소숫점 입력
KeyFloat.addEventListener('click', ()=>{
    if(count_f == 0) {
        num.push(".");
        cal+='.';
        count_f = 1;
        TextDisplay.value = cal;
    }
});

// 값구하기
key_result.addEventListener('click',()=>{
    find_cal();
    if(count_b == 1){
        num = [];
        res = String(res);
        res = res.split("");
        for(let i = 0; i < res.length; i++){
        num.push(res[i]);
        }
        num.push(oper);
        num.push(plusres)
    }
    if (num[c+1] == null || count_b == 1) {
        if(count_b == 0){
            for(let i = 0; i < c; i++){
                num.push(num[i]);
            }
        }
        calculation();
        res = Number(res.toFixed(1));
        if(count_b == 0){
            plusres = num[0];
        }
        c = 0;
        cal = '';
        cal+= res;
        TextDisplay.value = cal;
        display_result.innerHTML = res;
        count_a = 2;
        count_b = 1;
        console.log()
    } else {
        calculation();
        res = Number(res.toFixed(1));
        cal+= '='+res;
        TextDisplay.value = cal;
        display_result.innerHTML = res;
        plusres = num[c+1];
        count_b = 1;
        // 초기화
        num = [];
        count_a = 2;
    }
    console.log(num,res,oper,plusres)
})

// 클리어키
Keyclear.addEventListener('click', ()=>{
    clear();
    TextDisplay.value = cal;
    display_result.innerHTML = 0;
})

// 지우기
KeyBack.addEventListener('click', ()=>{
    if(count_a == 2){
        clear();
        display_result.innerHTML = 0;
    }
    num = num.slice(0,-1);
    cal = cal.slice(0,-1);
    count_a = 0;
    TextDisplay.value = cal;
});

function calculation (){
    find_cal();
    // 첫번째 값 구하기
    for(let i = 1; i < c; i++){
        num[0]+=num[i];
    }
    // 두번째 값 구하기
    for(let j = c+2; j < num.length; j++){
        num[c+1]+=num[j];
    }
    let num_f = Number(num[0]);
    let num_t = Number(num[c+1]);
        switch(oper){
            case '+':
                res = num_f+num_t;
                break;
            case '-':
                res = num_f-num_t;
                break;
            case 'x':
                res = num_f*num_t;
                break;
            case '÷':
                res = num_f/num_t;
                break;
            case '%':
                res = num_f%num_t;
                break;
            default:
                alert('Ereer');   
        }
}

function clear(){
    num = []; // 숫자 입력값
    oper = null;
    res = null;
    plusres = null;
    cal = ''; //display 보여주기
    c = 0; // 숫자 찾기 카운트
    count_a = 0; //계산용 카운트
}

function find_cal(){
    // 연산자 찾기
    for(let i = 0; i<num.length; i++){
        for(let j = 0; j<Operpad.length; j++){
            if(num[i] == Operpad[j]){
                oper = num[i]
                c = i;
            }
        }
    }
}

///dsdsdsdsdsds