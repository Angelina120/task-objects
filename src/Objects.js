/*
  В функцию personUpdate() приходят данные в виде объекта, содержащую некую информацию о человеке.
  Если этот человек является женщиной (свойство gender содержит значение 'female'), то из этого объекта
  необходимо удалить свойство age, если оно есть.
  Если этот человек является мужчиной (свойство gender содержит значение 'male'), следует убедиться,
  что в этом объекте есть свойство income. Если его нет, необходимо его добавить
  и присвоить начальное значение 100000.
  Объект после манипуляций следует вернуть в качестве результата работы функции.
*/
export function personUpdate(data) {
    if (data.gender === 'female') {
        delete data.age;
    } else if (data.gender === 'male' && !('income' in data)) {
        data.income = 100000;
    }
    return data;
}

/*
  В функцию objectFieldsList приходят три объекта с различными полями, список которых заранее неизвестен.
  Верните список названий этих полей в алфавитном порядке в виде массива строк.
*/
export function objectFieldsList(obj1, obj2, obj3) {
    return Array.from(
        new Set([
            ...Object.keys(obj1),
            ...Object.keys(obj2),
            ...Object.keys(obj3),
        ]),
    ).sort();
}

/*
  Верните в результате работы функции массив с клонами объекта obj.
  При этом каждый клон должен дополнительно содержать поле id со своим порядковым номером в массиве.
  Количество клонов - count.
*/
export function objectClone(obj, count) {
    // Глубокая копия через structuredClone (поддерживает вложенные объекты и массивы)
    // Если среда не поддерживает structuredClone — используем JSON-метод или рекурсию
    const deepClone = (source) => {
        if (typeof structuredClone === 'function') {
            return structuredClone(source);
        }
        // Fallback: рекурсивное клонирование
        if (source === null || typeof source !== 'object') return source;
        if (Array.isArray(source)) return source.map(deepClone);
        const result = {};
        for (const key of Object.keys(source)) {
            result[key] = deepClone(source[key]);
        }
        return result;
    };

    const result = [];
    for (let i = 0; i < count; i++) {
        const clone = deepClone(obj);
        clone.id = i;
        result.push(clone);
    }
    return result;
}
