<template>
    <div class="timer-edit">
        <div class="red-text">PC가 절전 모드 해제 상태인 경우에만 알림이 표시됩니다. <a href="#">자세히 알아보기</a></div>
        <div class="bord-text">타이머 편집</div>
        <div class="form-wrap">
            <div class="timer-edit-form">
                <div class="edit-select-box">
                    <button class="edit-up-btn" @click="incrementHour(-1)">
                        <font-awesome-icon icon="angle-up"/>
                    </button>
                    <ul>
                        <li v-for="(item, index) in hours" 
                        :key="index" :class="index == 3 ? 'select-on' : ''" 
                        @mousewheel="(e) => wheelEvent(e, 'hours')" @click="setHMS(item, 24, 'hours');">
                           {{('0'+item).substr(-2)}}
                        </li>
                    </ul>
                    <button class="edit-down-btn" @click="incrementHour(1)">
                        <font-awesome-icon icon="angle-down"/>
                    </button>
                </div>
                <div class="edit-select-box">
                    <button class="edit-up-btn" @click="incrementMinute(-1)">
                        <font-awesome-icon icon="angle-up"/>
                    </button>
                    <ul>
                        <li v-for="(item, index) in minutes" 
                        :key="index" :class="index == 3 ? 'select-on' : ''" 
                        @mousewheel="(e) => wheelEvent(e, 'minutes')" @click="setHMS(item, 60, 'minutes');">
                            {{('0'+item).substr(-2)}}
                        </li>
                    </ul>
                    <button class="edit-down-btn" @click="incrementMinute(1)">
                        <font-awesome-icon icon="angle-down"/>
                    </button>
                </div>
                <div class="edit-select-box">
                    <button class="edit-up-btn" @click="incrementSecond(-1)">
                        <font-awesome-icon icon="angle-up"/>
                    </button>
                    <ul>
                         <li v-for="(item, index) in seconds" 
                         :key="index" :class="index == 3 ? 'select-on' : ''" 
                         @mousewheel="(e) => wheelEvent(e, 'seconds')"  @click="setHMS(item, 60, 'seconds');">
                            {{('0'+item).substr(-2)}}
                        </li>
                    </ul>
                    <button class="edit-down-btn"  @click="incrementSecond(1)">
                        <font-awesome-icon icon="angle-down"/>
                    </button>
                </div>
            </div>
        </div>
        <div class="form-info-text">
            <div>시간</div>
            <div>분</div>
            <div>초</div>
        </div>

        <div class="timer-name-title">타이머 이름</div>
        <input type="text" class="timer-name" onfocus="this.select()" value="카운트 다운"  v-model="timerName">
        <br><br><br>
        <button class="btn" @click="runTimer()"><font-awesome-icon icon="play"/></button>
    </div>
</template>

<script>
export default {
    name: 'timerEditComponent',
    data() {
        return {
            hours: [21,22,23,0,1,2,3],
            minutes: [57,58,59,0,1,2,3],
            seconds: [57,58,59,0,1,2,3],
            timerName: "카운트 다운"
        }
    },
    mounted() {
        if(document.myTimer) {
            this.timerName = document.myTimer.name;
            this.setHMS(Number(document.myTimer.time.substr(0,2)), 24, 'hours');
            this.setHMS(Number(document.myTimer.time.substr(3,2)), 60, 'minutes');
            this.setHMS(Number(document.myTimer.time.substr(6,2)), 60, 'seconds');
        }
    },
    methods: {
        incrementRotate(type, value) {
            const types = {
                hours: {max: 24, datas: this.hours}, 
                minutes: {max: 60, datas: this.minutes}, 
                seconds: {max: 60, datas: this.seconds}
            };
            const {max, datas} = types[type];
            if( value > 0 ) {
                datas.push((datas[datas.length-1]+value) %max);
                datas.shift();
            }
            else {
                datas.splice(0, 0, ((max + datas[0])+value) % max);
                datas.splice(datas.length-1, 1);
            }
        },
        incrementHour(value) {this.incrementRotate('hours', value);},
        incrementMinute(value) {this.incrementRotate('minutes', value);},
        incrementSecond(value) {this.incrementRotate('seconds', value);},

        runTimer() {
            const zeroPad = (v) => ('0' + v).substr(-2);
            document.myTimer = {name: this.timerName, time: `${zeroPad(this.hours[3])}:${zeroPad(this.minutes[3])}:${zeroPad(this.seconds[3])}`};
            this.$router.push({path: '/'});
        },
        
        wheelEvent(e, type) {
            switch(type) {
                case 'hours':
                    if(e.wheelDelta > 0)  this.incrementHour(-1); 
                    else  this.incrementHour(1);
                    break;
                case 'minutes':
                    if(e.wheelDelta > 0)  this.incrementMinute(-1); 
                    else  this.incrementMinute(1);
                    break;
                case 'seconds':
                    if(e.wheelDelta > 0)  this.incrementSecond(-1); 
                    else  this.incrementSecond(1);
                    break;
            }
            
        },
        setHMS(time, max, hmsArrName) {
            let arr = [this.decTime(max,3,time),  this.decTime(max,2,time), this.decTime(max,1,time), 
                        time, this.incTime(max,1,time), this.incTime(max,2,time), this.incTime(max,3,time)];
             switch(hmsArrName) {
                case 'hours':
                    this.hours = arr;
                     break;
                case 'minutes':
                    this.minutes = arr;
                    break;
                case 'seconds':
                    this.seconds = arr;
                    break;
            }
        },
        incTime(max, incNum, time) {return (time + incNum) % max},
        decTime(max, decNum, time) {return (max + (time - decNum)) % max}
    }
}
</script>

<style scoped>
    .timer-edit {
        
    }

    .form-wrap {
        position: relative;
        width: 473.3px;
        height: 256px;
        overflow: hidden;
        border-top: 1px solid rgb(194,194,194);
        border-bottom: 1px solid rgb(194,194,194);
        display: inline-block;
    }

    .timer-edit-form {
        display: flex;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .timer-edit-form  ul {
        text-align: center;
    }

    

    .timer-edit-form  ul li {
        padding: 12px 70px;
        background-color: rgb(242,242,242);

        border-right: 1px solid rgb(194,194,194);
        border-left: 1px solid rgb(194,194,194);
    }

    .timer-edit-form  ul li:hover {
        background-color: rgb(218,218,218);
    }

    .timer-edit-form  ul li.select-on {
        background-color: rgb(145,193,231);
    }

    .timer-edit-form  ul li.select-on {
        background-color: rgb(145,193,231);

        border-right: 1px solid rgb(116,154,185);
        border-left: 1px solid rgb(116,154,185);
    }



    .edit-select-box {
        position: relative;
    }

    .edit-up-btn, .edit-down-btn {
        display: none;
        position: absolute;
        width: 100%;
        padding: 2px 0;
        background-color: rgb(230,230,230);
        border: 1px solid rgb(194,194,194);
        outline: none;
    }

    .edit-up-btn {
        top: 31px;
        border-bottom: none;
    }

    .edit-down-btn {
        bottom: 31px;
        border-top: none;
    }

    .edit-select-box:hover > .edit-up-btn {
        display: block;
    }

    .edit-select-box:hover > .edit-down-btn {
        display: block;
    }

    .form-info-text {
        display: flex;
        width: 479.3px;
        text-align: center;
    }

    .form-info-text > div {
        flex: 1;
    }

    .timer-name-title {
        margin: 10px 0;
    }

    .timer-name {
        width: 479.3px;
        color: rgb(58 120 171);
        border: 0;
        border-radius: 0;
        outline:1px solid rgb(58 120 171);
        /* outline-color: rgb(58 120 171);
        outline-offset: 1px; */
        padding: 7px 0;
        font-size: 16px;
    }

    .timer-name:hover {
        color: gray;
    }

    .timer-name:focus {
        color: #000;
    }

    .timer-name::selection {
        color: #fff;
        background-color: rgb(58 120 171);
    }
</style>