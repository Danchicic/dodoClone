import random


def generate_random_name(min_syllables=2, max_syllables=4) -> str:
    """
    Генерирует случайное имя, комбинируя слоги.

    :param min_syllables: Минимальное количество слогов в имени.
    :param max_syllables: Максимальное количество слогов в имени.
    :return: Случайно сгенерированное имя.
    """
    # Базовые слоги для генерации имен
    syllables = [
        'ba', 'be', 'bi', 'bo', 'bu',
        'da', 'de', 'di', 'do', 'du',
        'ka', 'ke', 'ki', 'ko', 'ku',
        'la', 'le', 'li', 'lo', 'lu',
        'ma', 'me', 'mi', 'mo', 'mu',
        'na', 'ne', 'ni', 'no', 'nu',
        'ra', 're', 'ri', 'ro', 'ru',
        'sa', 'se', 'si', 'so', 'su',
        'ta', 'te', 'ti', 'to', 'tu'
    ]

    # Выбираем случайное количество слогов
    num_syllables = random.randint(min_syllables, max_syllables)

    # Формируем имя, комбинируя случайные слоги
    name_parts = [random.choice(syllables) for _ in range(num_syllables)]

    # Собираем имя и делаем первую букву заглавной
    random_name = ''.join(name_parts).capitalize()

    return random_name


def generate_random_phone_number() -> str:
    """
    Генерирует случайный номер телефона в формате +7 (XXX) XXX-XX-XX.

    :return: Случайно сгенерированный номер телефона в виде строки.
    """
    # Генерация случайных цифр для номера телефона
    area_code = ''.join(random.choices('0123456789', k=3))  # Код региона (3 цифры)
    first_part = ''.join(random.choices('0123456789', k=3))  # Первые 3 цифры
    second_part = ''.join(random.choices('0123456789', k=2))  # Следующие 2 цифры
    third_part = ''.join(random.choices('0123456789', k=2))  # Последние 2 цифры

    # Формирование номера телефона в формате +7 (XXX) XXX-XX-XX
    phone_number = f"+7 ({area_code}) {first_part}-{second_part}-{third_part}"

    return phone_number
