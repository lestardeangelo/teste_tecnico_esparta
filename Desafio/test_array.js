function solution(A) {
    let semPar = 0; // inicializa uma variável semPar com valor 0
  
    for (let i = 0; i < A.length; i++) {
      semPar ^= A[i]; // operação XOR para encontrar o elemento sem par
      /* 
        A operação XOR é uma operação bit a bit, assim ela retorna 1 ou 0.
        Como cada elemento tem um par, todos os elementos iguais vão resultar em 0 
        e o único elemento que não tem par vai resultar nele mesmo. 
        Então, no final do loop, a variável semPar terá o valor do elemento sem par.
      */
    }
  
    return semPar; // retorna o valor do elemento sem par
}
  
console.log(solution([9, 3, 9, 3, 9, 7, 9])); // Deve imprimir 7