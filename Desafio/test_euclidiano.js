function solution(N, M) {
    let chocolates = N; // variável que armazena o número de chocolates restantes para comer
    let eaten = 0; // variável que conta quantos chocolates já foram comidos
  
    while (chocolates > 0) { // enquanto ainda houver chocolates restantes
      eaten++; // incrementa o contador de chocolates comidos
      chocolates--; // decrementa o número de chocolates restantes
      if (chocolates % M === 0) { // se o número restante de chocolates for divisível por M
        chocolates--; // então pulamos o próximo chocolate, decrementando "chocolates" novamente
      }
    }
  
    return eaten; // retorna o número total de chocolates comidos
}

console.log(solution(10, 4)); // output: 5