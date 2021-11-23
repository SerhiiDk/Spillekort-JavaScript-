document.addEventListener('DOMContentLoaded', ()=> {
    const cards = [];
    const btnStart = document.querySelector('.game__btn-start');
    const divCards = document.querySelector('.test__div');
    let invervalTime = document.querySelector('.timer__select');
    let time;
    let cardsTimer;
    let count = 1;
    const cardsPic = ['img/VKre.png', 'img/VChur.png', 'img/VPik.png', 'img/VByb.png', 'img/KKre.png', 'img/KByb.png', 'img/KChur.png', 'img/KPik.png', 'img/VKre.png', 'img/VChur.png', 'img/VPik.png', 'img/VByb.png', 'img/KKre.png', 'img/KByb.png', 'img/KChur.png', 'img/KPik.png'];

    const GameStepState = {
        NoCardOpen: 'no_card_open',
        OneCardOpen: 'one_card_open',
    };

    let curretGameStepState = GameStepState.NoCardOpen;

    let fisrtCard = null;
    let secondCard = null;

    btnStart.addEventListener('click',() => {
        invervalTime.innerHTML = '60';
        cardsTimer = setInterval(gameIsOver, 1000);
        document.querySelectorAll('.radio-btn').forEach(function(radioBtn){
            btnStart.setAttribute('disabled', true);
            if(radioBtn.checked) {
                for(let i=0; i<radioBtn.value; i++){
                        cards.push({value:count, isOpen:false, foto:cardsPic[i]})
                    count++;
                    if(count>radioBtn.value/2) {
                        count=1;
                        }
                    
                }
                console.log(cards)
                shuffle(cards);
            }

            function shuffle(array) {
                let currentIndex = array.length,  randomIndex;
              
                // While there remain elements to shuffle...
                while (currentIndex != 0) {
              
                  // Pick a remaining element...
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex--;
              
                  // And swap it with the current element.
                  [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
                }
                createElement();
                return array
              }
        })

        function  createElement() { 
            for(let value of cards) {
            let div  = document.createElement('div');
            let frontElement = document.createElement('div');
            let backElement = document.createElement('div');
            div.onclick = function () {  ;
                switch (curretGameStepState) {
                    case GameStepState.NoCardOpen:
                        fisrtCard = value;
                        div.classList.toggle('flipCard');
                        backElement.style.backgroundImage = `url(${value.foto})`;
                        curretGameStepState = GameStepState.OneCardOpen;
                        return;
                    case GameStepState.OneCardOpen:
                        clearTimeout();
                        secondCard = value;
                        div.classList.toggle('flipCard');
                        backElement.style.backgroundImage = `url(${value.foto})`;
                        if (fisrtCard.value === secondCard.value) {
                            document.querySelectorAll('.flipCard').forEach(function(addClass){
                                addClass.classList.add('foundCard');
                                addClass.classList.remove('card__flipped');
                            })
                            fisrtCard.isOpen = true;
                            secondCard.isOpen = true;
                            fisrtCard  = null;
                            secondCard = null;
                            card();
                        }
                        else 
                        {
                            setTimeout(()=> {
                                document.querySelectorAll('.flipCard').forEach(function(deleteClass){
                                    deleteClass.classList.remove('flipCard');
                                    deleteClass.style.backgroundImage = 'none';
                                })
                            }, 1500)
                            curretGameStepState = GameStepState.NoCardOpen;
                        }
                }
                
            }
            div.classList.add('cards');
            frontElement.classList.add('card__front');
            backElement.classList.add('card__back');
            divCards.appendChild(div);
            div.append(frontElement);
            div.append(backElement);
            }
        }

        function card () {
            const res = cards.every(card => card.isOpen === true);
            if (res === true) {
                btnStart.removeAttribute('disabled');
                alert('Finish')
                return true
                
            }
            else {
                curretGameStepState = GameStepState.NoCardOpen;
            }
        }

        function gameIsOver () {
            time = invervalTime.innerHTML - 1;
            invervalTime.innerHTML = time;
            if (time == 0) {
                alert('Finish');
                location.reload();
                clearInterval(cardsTimer);
            }
        }

    })
  
})
