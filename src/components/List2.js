import React, { useEffect, useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import agendamentoService from "../services/agendamento.service";
import tipoAtendService from "../services/tipoAtend.service";
import { format } from "date-fns-tz";
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

	async function retListTipoAtend(cdTipoAtend) {
		try {
			const response = await tipoAtendService.get(cdTipoAtend);
			setDsTipoAtend(response.data.ds_tipoAtend);
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	return (
		<div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>nr</th>
						<th>Nome</th>
						<th>Tipo Atendimento</th>
						<th>Data Atendimento</th>
						{/* Adicione mais colunas conforme necessário */}
					</tr>
				</thead>
				<tbody>
					{currentItems.map((item) => {
                        retListTipoAtend(item.cd_tipoAtend);
                        var dataFormatada = new Date(item.dt_atendimento)
                        
						return (
							<tr key={item.nr_agendamento}>
								<td>{item.nr_agendamento}</td>
								<td>{item.paciente.pessoa.nome}</td>
								<td>{dsTipoAtend}</td>
								<td>{format(dataFormatada, "dd-MM-yyyy")}</td>
								{/* Adicione mais colunas conforme necessário */}
							</tr>
						);
					})}
				</tbody>
			</Table>

			<Pagination>
				<Pagination.Prev
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				/>
				{Array.from({ length: totalPages }, (_, index) => (
					<Pagination.Item
						key={index + 1}
						active={index + 1 === currentPage}
						onClick={() => handlePageChange(index + 1)}
					>
						{index + 1}
					</Pagination.Item>
				))}
				<Pagination.Next
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				/>
			</Pagination>
		</div>
	);
};

export default ListAgendamentoDate;
