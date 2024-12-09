package com.simbiose.crudpessoa.repository;

import com.simbiose.crudpessoa.model.Pessoa; // Importa a classe
import org.springframework.data.jpa.repository.JpaRepository; // Importa para manipulação de dados

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
}
