const PhysicsUtil = require('../util/PhysicsUtil');
const MapUtil = require('../util/MapUtil');
const map = require('../views/map')

const MAP_WALLS = MapUtil.toGeometry(map, '+');
// const MAP_MUDS = MapUtil.toGeometry(map, 'x');
// const MAP_DIAMOND = MapUtil.toGeometry(map, '$');

test('Hero must not overlap a wall', () => {
    const heroNewHitbox = { x: 120, y: 300, w: 20, h: 20 };

    expect(PhysicsUtil.overlap(heroNewHitbox, MAP_WALLS )).toBe(false);
  });