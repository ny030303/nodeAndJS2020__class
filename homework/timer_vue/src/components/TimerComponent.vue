<template>
    <div>
        <div class="red-text">PC가 절전 모드 해제 상태인 경우에만 알림이 표시됩니다. <a href="#">자세히 알아보기</a></div>
        <div class="timer">
            <div class="timer-text z-up">
                <span :class="Number(new Date(timerTs).toISOString().substr(11,2)) == 0 ? 'on' : ''">{{new Date(timerTs).toISOString().substr(11,2)}}:</span>
                <span :class="Number(new Date(timerTs).toISOString().substr(11,2)) == 0 
                && Number(new Date(timerTs).toISOString().substr(14,2)) == 0 ? 'on' : ''">{{new Date(timerTs).toISOString().substr(14,2)}}:</span>
                <span :class="Number(new Date(timerTs).toISOString().substr(11,2)) == 0 
                && Number(new Date(timerTs).toISOString().substr(14,2)) == 0 && 
                Number(new Date(timerTs).toISOString().substr(17,2)) == 0 ? 'on' : ''">{{new Date(timerTs).toISOString().substr(17,2)}}</span>
            </div>
            <div class="timer-menu z-up">
                <div class="reset-btn" @click="(e) => reset(e)"> 
                    <font-awesome-icon icon="redo" />
                </div>
                <div class="start-btn"  @click="play()">
                    <font-awesome-icon :icon="!isPlay ? 'play' : 'pause'" />
                </div>
                <div class="sizeup-btn">
                    <font-awesome-icon icon="expand-alt" />
                </div>
            </div>
            <div class="count-down z-up">
                <div class="count-down-name">{{timerName}}</div>
                <div class="count-down-text">{{timerValue}}</div>
            </div>
            <div class="timer-back" @click="() => {if(!isPlay) $router.push({path: '/edit'})}"></div>
        </div>
    </div> 
</template>

<script>

export default {
    name: 'timerComponent',
    data() {
        return {
            transitionName: 'slide-left',
            timerTs: 0,
            timerName: '카운트 다운',
            timerValue: '00:00:00',
            timerInterval: null,
            isPlay: false
        }
    }, 
    mounted() {
        if(document.myTimer) {
            // console.log(document.myTimer);
            this.timerValue = document.myTimer.time;
            this.timerName = document.myTimer.name;
            this.timerTs = new Date(`1970-01-01T${this.timerValue}.000Z`).getTime();
            this.isPlay = true;
            this.start();
        }
    },
    methods: {
        reset() {
            if(document.myTimer) {
                this.timerTs = new Date(`1970-01-01T${this.timerValue}.000Z`).getTime();
            }
        },
        play() {
            if(document.myTimer) {
                if(!this.isPlay) { // false 일 때
                    this.isPlay = true;
                    if(this.timerInterval == null) this.start();
                } else {
                    this.isPlay = false;
                }
            }
        },
        start() {
            if(document.myTimer) {
                this.timerInterval = setInterval(() => {
                    if(this.isPlay) this.timerTs -= 1000;
                    if( this.timerTs < 0 ) { 
                        clearInterval(this.timerInterval);
                        this.timerInterval = null;
                        this.isPlay = false;
                        alert("타이머 종료 알림");
                        this.timerTs = new Date(`1970-01-01T${this.timerValue}.000Z`).getTime();
                    }
                }, 1000);
            }
        },
        sizeUp() {

        }
    }
}
</script>

<style>
.timer {
    width: 280px;
    height: 193px;
    margin: 20px auto;
    text-align: center;
    position: relative;
}

.timer-back:hover {
    background-color: rgb(233,233,233);
}

.timer-back {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 0;
}

.z-up {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
}
/* .timer:active{
    background-color: rgb(208,208,208);
}  */

.timer-text {
    font-size: 40px;
    font-weight: bold;
    z-index: 1;
    display: inline-block;
}

.timer-text > span.on {
    color: rgb(185,185,185);
}

.timer-menu {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    top: 47%;
    transform: translate(-50%, -50%);
}

.timer-menu > div {
    margin: 0 20px;
    font-size: 21px;
}

.reset-btn {
    color: rgb(185,185,185);
}

.start-btn {
    border: 2px solid rgb(185,185,185);
    border-radius: 50%;
    padding: 11.5px 21px 15.5px 21px;
    text-align: center;
    font-size: 16px;
}

.start-btn:hover {
    background-color: rgb(209,209,209);
}

.sizeup-btn {
    padding: 9px 15px;
    margin: 0 5px !important;
}
.sizeup-btn:hover {
    background-color: rgb(209,209,209);
}
.count-down {
    margin: 10px 0;
    bottom: 3px;
}

.count-down-text {
    font-weight: bold;
}


</style>