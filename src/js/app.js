import fetchData from './http';

export function healthIndicator(object) {
    if (object.health > 50) {
        return 'healthy';
    } if (object.health > 15) {
        return 'wounded';
    }
    return 'critical';
}

export function sortCharacters(array) {
    return array.sort((x, y) => y.health - x.health);
}

export function getLevel(userId) {
    const response = fetchData(`https://server/user/${userId}`);
    if (response.status === 'ok') {
        return `Ваш текущий уровень: ${response.level}`;
    }
    return 'Информация об уровне временно недоступна';
}
