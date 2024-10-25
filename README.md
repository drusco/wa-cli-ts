## Analisador de hierarquia de palavras

Uma aplicação do tipo Command-Line Interface (CLI) desenvolvida usando Typescript com o propósito de ser avaliada pela empresa Wa Project.

---

### Usos da aplicação

A aplicação analisa uma frase enviada pelo usuário como parâmetro e busca dentro do arquivo `dicts/data.json` palavras que façam parte da frase. Quando uma palavra é encontrada, a aplicação analisa a profundidade associada à palavra mencionada na frase e então mostrará os itens mais próximos dessa profundidade.

### Instalação do projeto

Este projeto foi criado usando bun init no bun v1.1.32. [Bun](https://bun.sh). Para instalar o projeto é necessário executar o seguinte comando

```
bun install
```

### Formato de entrada

A aplicação usa a seguinte sintaxe.

```
bun run cli.ts analyze –depth <n> –verbose (optional) "{phrase}"
```

### Parâmetros

<table><tbody><tr><td>analyze</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>--depth</td><td>int</td><td>&nbsp;número inteiro maior que zero.</td></tr><tr><td>--verbose</td><td>boolean</td><td>&nbsp;opcional, mostra o tempo de carregamento dos parâmetros e da verificação da frase.</td></tr><tr><td>"phrase"</td><td>String</td><td>&nbsp;o texto que será usado para comparar com as informações do arquivo dicts/data.json</td></tr></tbody></table>

### Formato do JSON

O arquivo dicts/data.json tem uma única propriedade chamada `**data**`, e essa propriedade é um `**Array<Item>**`

```
{
    data: Array<Item>[
        <Item>{
            name: String,
            items: Array<Item>
        }
    ]
}
```

### Exemplos

- Exemplo 1: Possui uma correspondência e está utilizando todos os parâmetros.

```
bun run cli.ts analyze --depth 2 "Eu amo papagaios" --verbose
```

output: Aves = 1

- Exemplo 2: Possui duas correspondências.

```
bun run cli.ts analyze --depth 3 "Eu vi gorilas e papagaios"
```

output: Pássaros = 1; Primatas = 1;

- Exemplo 3: Não possui correspondência.

```
bun run cli.ts analyze --depth 5 "Eu tenho preferência por animais carnívoros"
```

output: 0;

Na frase não existe nenhum filho do nível 5 e nem o nível 5 possui os termos especificados.
