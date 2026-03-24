### 1. Kolekcja: `characters`

| Pole             | Typ          | Wymagane  | Opis                    | Przykład                   |
|:-----------------|:-------------|:---------:|:------------------------|:---------------------------|
| `_id`            | **ObjectId** |     ✅     | ID postaci              | `ObjectId("507f1f...")`    |
| `name`           | **String**   |     ✅     | Imię postaci            | `Mała Mi`                  |
| `description`    | **String**   |     ✅     | Opis charakteru         | `Zaciekła i niezależna...` |
| `species`        | **String**   |     ✅     | Gatunek                 | `Mimbla`                   |
| `sleepingWinter` | **Boolean**  |     ✅     | Czy śpi snem zimowym    | `true`                     |
| `bestFriend`     | **ObjectId** |     ❌     | Referencja do Character | `ObjectId("507f1f...")`    |


### 2. Kolekcja: `artifacts`

| Pole          | Typ          |  Wymagane   | Opis                                 | Przykład                  |
|:--------------|:-------------|:-----------:|:-------------------------------------|:--------------------------|
| `_id`         | **ObjectId** |      ✅      | ID artefaktu                         | `ObjectId("507f1f...")`   |
| `name`        | **String**   |      ✅      | Nazwa artefaktu                      | `Flet`                    |
| `description` | **String**   |      ✅      | Opis właściwości                     | `Zmienia rzeczy w chmury` |
| `type`        | **String**   |      ✅      | Typ artefaktu                        | `Instrument`              |
| `owner`       | **ObjectId** |      ✅      | Referencja do Character (właściciel) | `ObjectId("507f1f...")`   |