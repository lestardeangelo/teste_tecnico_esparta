INSERT INTO
  aluno(nome)
VALUES 
  ('EDUARDO'),
  ('MATHEUS'),
  ('FELIPE'),
  ('ALINE'),
  ('MARCOS'),
  ('RODRIGO'),
  ('LUCAS'),
  ('GUSTAVO');
  
INSERT INTO
  professor(nome)
VALUES 
  ('JOAO PEDRO'),
  ('LUCAS RENATO'),
  ('AMANDA ALVES'),
  ('LESTAR ANGELO'),
  ('MONICA OLIVEIRA');
  
INSERT INTO
  disciplina(nome)
VALUES 
  ('MATEMATICA'),
  ('FISICA'),
  ('QUIMICA'),
  ('GEOGRAFIA'),
  ('ECONOMIA');

INSERT INTO
  turma(dia_da_semana, horario, disciplina_id, professor_id, aluno_id)
VALUES 
  ('1', '14:20', '2', '1', '5'),
  ('2', '15:00', '1', '3', '4'),
  ('3', '10:30', '5', '2', '1'),
  ('4', '08:50', '3', '5', '2'),
  ('2', '07:30', '2', '1', '4'),
  ('2', '06:50', '1', '3', '5'),
  ('5', '18:20', '1', '3', '3'),
  ('3', '16:50', '3', '5', '4'),
  ('5', '09:10', '2', '4', '3');
  
INSERT INTO
  aluno_turma(aluno_id, turma_id)
VALUES 
  ('1','2'),
  ('2','2'),
  ('3','1'),
  ('4','3'),
  ('5','3');