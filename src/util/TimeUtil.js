

export default class TimeUtil {

    static msUntilNow = (t) => {
        return new Date().getTime() - new Date(t).getTime();
    }

    static msToTime = (s) => {
        let ms = s % 1000;
        s = (s - ms) / 1000;

        return s;
    }

}