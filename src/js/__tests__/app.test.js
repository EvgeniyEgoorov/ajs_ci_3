import { healthIndicator, sortCharacters, getLevel } from '../app';
import fetchData from '../http';

jest.mock('../http');

test.each([
    [{ name: 'char1', health: 90 }, 'healthy'],
    [{ name: 'char2', health: 45 }, 'wounded'],
    [{ name: 'char3', health: 5 }, 'critical'],
])('test health status for %p', (object, expectedResult) => {
    const result = healthIndicator(object);
    expect(result).toBe(expectedResult);
});

test('test sorting feature', () => {
    const objectList = [
        { name: 'мечник', health: 10 },
        { name: 'маг', health: 100 },
        { name: 'лучник', health: 80 },
      ];
    const expectedResult = [
        { name: 'маг', health: 100 },
        { name: 'лучник', health: 80 },
        { name: 'мечник', health: 10 },
      ];
    const result = sortCharacters(objectList);
    expect(result).toEqual(expectedResult);
});

beforeEach(() => {
    jest.resetAllMocks();
});
test.each([
    [{ status: 'ok', level: 5 }, 'Ваш текущий уровень: 5'],
    [{ status: 'nok', level: undefined }, 'Информация об уровне временно недоступна'],
])('test getting level', (object, expectedResult) => {
    fetchData.mockReturnValue(object);
    const result = getLevel(1);
    expect(fetchData).toBeCalledWith('https://server/user/1');
    expect(result).toEqual(expectedResult);
});
