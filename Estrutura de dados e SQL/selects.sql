SELECT DISTINCT aluno.nome
FROM aluno
JOIN aluno_turma ON aluno_turma.aluno_id = aluno.id
JOIN turma ON turma.id = aluno_turma.turma_id
JOIN professor ON professor.id = turma.professor_id
WHERE professor.nome = 'JOAO PEDRO';

SELECT DISTINCT turma.dia_da_semana
FROM turma
JOIN disciplina ON disciplina.id = turma.disciplina_id
WHERE disciplina.nome = 'MATEMATICA';

SELECT DISTINCT aluno.nome
FROM aluno
JOIN turma ON turma.aluno_id = aluno.id
JOIN disciplina ON disciplina.id = turma.disciplina_id
WHERE disciplina.nome IN ('MATEMATICA', 'FISICA')
GROUP BY aluno.nome
HAVING COUNT(DISTINCT disciplina.nome) = 2;

SELECT disciplina.nome
FROM disciplina
LEFT JOIN turma ON turma.disciplina_id = disciplina.id
WHERE turma.id IS NULL;

SELECT DISTINCT aluno.nome
FROM aluno
JOIN aluno_turma ON aluno_turma.aluno_id = aluno.id
JOIN turma ON turma.id = aluno_turma.turma_id
JOIN disciplina ON disciplina.id = turma.disciplina_id
WHERE disciplina.nome = 'MATEMATICA'
AND aluno.id NOT IN (
    SELECT DISTINCT aluno.id
    FROM aluno
    JOIN aluno_turma ON aluno_turma.aluno_id = aluno.id
    JOIN turma ON turma.id = aluno_turma.turma_id
    JOIN disciplina ON disciplina.id = turma.disciplina_id
    WHERE disciplina.nome = 'QUIMICA'
);