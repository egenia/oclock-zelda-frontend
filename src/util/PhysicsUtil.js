
export default class PhysicsUtil {

    static overlaps = (obj, objs) => {
        for (let o of objs) if (PhysicsUtil.overlap(obj, o)) return true;
        return false;
    };

    static overlap = (obj0, obj1) => {
        return !(obj0.x + (obj0.w || obj0.width) <= obj1.x
            || obj0.y + (obj0.h || obj0.height) <= obj1.y
            || obj0.x >= obj1.x + (obj1.w || obj1.width)
            || obj0.y >= obj1.y + (obj1.h || obj1.height));
    };

    static withinStrict = (obj0, obj1) => {
        return obj0.x >= obj1.x
            && obj0.y >= obj1.y
            && obj0.x + (obj0.w || obj0.width) <= obj1.x + (obj1.w || obj1.width)
            && obj0.y + (obj0.h || obj0.height) <= obj1.y + (obj1.h || obj1.height);
    }

}