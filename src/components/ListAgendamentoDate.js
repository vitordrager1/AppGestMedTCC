import React, { useEffect, useState, useCallback } from "react";
import { Table, Pagination } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import tipoAtendService from "../services/tipoAtend.service";
import { format } from "date-fns-tz";
import "../components/ListTable/table.css";

const ListAgendamentoDate = ({ dados, itemsPerPage }) => {
	const [currentPage, setCurrentPage] = React.useState(1);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = dados.slice(indexOfFirstItem, indexOfLastItem);

	const totalPages = Math.ceil(dados.length / itemsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	const [nome, setNome] = useState("");
	const [dsTipoAtend, setDsTipoAtend] = useState("");

	function handleNomeChange(e) {
		setNome(e.target.value);
	}

	return (
		<div className="bgTableList">
			<Table id="agendamentos" striped bordered hover>
				<thead>
					<tr>
						<th className="title">Agendamento</th>
						<th className="title">Nome</th>
						<th className="title">Tipo Atendimento</th>
						<th className="title">Data Atendimento</th>
						<th className="title">Hora Ínicio</th>
						<th className="title">Hora Término</th>
						{/* Adicione mais colunas conforme necessário */}
					</tr>
				</thead>
				<tbody>
					{currentItems &&
						currentItems.map((item) => {
							// retListTipoAtend(item.cd_tipoAtend);
							var dataFormatada = new Date(item.dt_atendimento);

							return (
								<tr key={item.nr_agendamento}>
									<td>{item.nr_agendamento}</td>
									<td>{item.paciente.pessoa.nome}</td>
									<td>{item.tipoAtendimento.ds_tipoAtend}</td>
									<td>
										{format(dataFormatada, "dd-MM-yyyy")}
									</td>
									<td>{item.dt_horaInicio}</td>
									<td>{item.dt_horaFim}</td>
									{/* Adicione mais colunas conforme necessário */}
								</tr>
							);
						})}
				</tbody>
			</Table>
			<Pagination className="pagination">
				<Pagination.Prev
					className="paginationItems"
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				/>
				{Array.from({ length: totalPages }, (_, index) => (
					<Pagination.Item
						className="paginationItems"
						key={index + 1}
						active={index + 1 === currentPage}
						onClick={() => handlePageChange(index + 1)}
					>
						{index + 1}
					</Pagination.Item>
				))}
				<Pagination.Next
					className="paginationItems"
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				/>
			</Pagination>
		</div>
	);
};

export default ListAgendamentoDate;
