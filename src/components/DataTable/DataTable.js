import React, {Component} from 'react';
import Axios from 'axios'
import './DataTable.scss'
import ReactTable from "react-table";
import "react-table/react-table.css";
import Moment from 'moment'

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

Number.prototype.format = function(n, x) {
	var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$& ');
};


const renderNone = ()=> <span> – </span>

class DataTable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			columns: [],
			isLoading: true,
		};
	}

	renderId(e) {
		return <span>{e.value}</span>
	}

	renderDate(e) {
		if(!e.value){
			return renderNone()
		}
		let date = Moment(e.value)

		return <span>{date.format('MM/DD/YYYY hh:mm')}</span>
	}

	renderCurrency(e) {
		if(!e.value){
			return renderNone()
		}

		let sum =   parseFloat(e.value.sum).format(2)
		let currency =  e.value.currency === 'Rub' ? '₽' : e.value.currency
		return <span>{sum} {currency}</span>
	}

	renderText(e) {
		return <span>{e.value}</span>
	}

	renderSelect(e) {

		if(!e.value){
			return renderNone()
		}else if(e.value && e.value.title){
			return <span>{e.value.title}</span>

		}else{
			return <span>{e.value.map(el=>el.title).join(', ')}</span>
		}
	}



	async componentDidMount() {
		let columnsData = await Axios.get('/columns')
		let data = await Axios.get('/data')


		let columns = columnsData.data.fields.map(el => {

			let renderMethod = `render${el.type.capitalize()}`
				let render = this[renderMethod] || this.renderText

			return {
				Header: el.title,
				accessor: el.name,
				Cell: render

			}
		})

		this.setState({
			columns,
			data: data.data,
			isLoading: false
		})


	}


	render() {
		return <div className={'DataTable'}>

			<ReactTable
				columns={this.state.columns}
				data={this.state.data}
				loading={this.state.isLoading}
				className="-striped -highlight"
			/>
		</div>
	}
}


export default DataTable;
