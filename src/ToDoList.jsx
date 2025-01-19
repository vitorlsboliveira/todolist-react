import {useState, useEffect} from "react";
import './ToDoList.css';
import icon from './assets/icon.webp';

function ToDoList() {

	const listaStorage = localStorage.getItem("lista");

	const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
	const [novoItem, setNovoItem] = useState("");

	useEffect(() => {
		localStorage.setItem("lista", JSON.stringify(lista));
	}, [lista]);

	function adicionaItem(form) {
		form.preventDefault();
		if (!novoItem) {
			return;
		}
		setLista([...lista, {text: novoItem, isCompleted: false}]);
		setNovoItem("");
		document.getElementById("input").focus();
	}

	function clicou(index) {
		const listaAtualizada = [...lista];
		listaAtualizada[index].isCompleted = !listaAtualizada[index].isCompleted;
		setLista(listaAtualizada);
	}

	function deleta(index) {
		const listaAtualizada = [...lista];
		listaAtualizada.splice(index, 1);
		setLista(listaAtualizada);
	}

	function deletaTudo() {
		setLista([]);
	}

    return (
        <div>
            <h1>Lista de Tarefas</h1>
			<form onSubmit={adicionaItem}>
				<input id="input" type="text" value={novoItem} onChange={(evento)=> {setNovoItem(evento.target.value)}} placeholder="Adicione uma tarefa"/>
				<button type="submit" className="add">+</button>
			</form>
			<div className="listaTarefas">
				<div style={{textAlign: "center"}}>
					{
						lista.length < 1
						?
						<img src={icon} style={{maxWidth: "80%"}}/>
						:
						lista.map((item, index) => (
							<div className={item.isCompleted ? "item completo" : "item"} key={index}>
								<span onClick={() => {clicou(index)}}>{item.text}</span>
								<button onClick={() => {deleta(index)}} className="del">Excluir</button>
							</div>
						))
					}
					{
						lista.length > 0
						&&
						<button onClick={() => {deletaTudo()}} className="deleteAll">Excluir tudo</button>
					}
				</div>
			</div>
        </div>
    )

}

export default ToDoList;