const {Translate, I18n} = ReactReduxI18n;

class FormKeyboard extends React.Component{
	constructor(){
		super();
		this.state = {
			confirm: false
		};
	}
	componentDidMount(){
		this._loadInit(0);
		Keyboard.bind('esc', (event) => {
			event.preventDefault();
			this.props.push(Routes.dashboard.view);
		});
		Keyboard.bind('f4', (event) => {
			this._onClickAdd();
		});
		Keyboard.bind('f6', (event) => {
			this._onClickEdit();
		});
		Keyboard.bind('f8', (events) => {
			if(this.props.form.mode === 'edit')
				this._onClickDelete();
		});
		Keyboard.bind('o', (event) => {
			if(this.state.confirm){
				this._bindDelete();
			}
		});
		Keyboard.bind('up', (event) => {
			event.preventDefault();
			this._getSelectedPrevious();
		});
		Keyboard.bind('down', (event) => {
			event.preventDefault();
			this._getSelectedNext();
		});
		$('#content').on('click', event => {
			const control = $(event.target).data('next');
			if(!control){
				this._setFocus(this.props.form.focus);
				return;
			}else{
				const currentControl = $(event.target).attr('id');
				this.props.formChangeFocus(currentControl);
				this._setFocus(currentControl);
			}
		});
		document.addEventListener('contextmenu', event => {
			const control = $(event.target).data('next');
			if(!control){
				this._setFocus(this.props.form.focus);
				return;
			}else{
				const currentControl = $(event.target).attr('id');
				this.props.formChangeFocus(currentControl);
				this._setFocus(currentControl);
			}
		});
	}
	_loadInit(key){
		this.props.loadList().then(() => {
			if(this.props.list.list.length > 0){
				this.props.selectDetail(this.props.list.list[key], key);
				if(this.props.detail.key > 0)
					this._setScrollToRow();
			}else
				this.props.formChangeMode('add');
			this._setFocus(this.props.form.focus);
		});
	}
	_setFocus(element){
		const control = $(`#${element}`);
		if(control.find('.search').length){
			control.dropdown('show');
			control.find('.search').focus();
		}else
			control.focus();
	}
	componentWillUnmount(){
		$('#content').off('click');
		this.state = {
			confirm: false
		};
		Keyboard.unbind('f4');
		Keyboard.unbind('f6');
		Keyboard.unbind('f8');
		Keyboard.unbind('up');
		Keyboard.unbind('down');
		Keyboard.unbind('o');
		Keyboard.unbind('esc');
	}
	_onClickAdd(){
		this._setFormAdd();
	}
	_onClickEdit(){
		if(this.props.form.mode === 'add'){
			setTimeout(() => {
				let values = $.extend({}, this.props.form.values);
				for(let field in values){
					let value = values[field];
					this._onChangeField(field, value);
				}

				const errors = this.props.form.errors;
				let valid = true;
				for(let field in errors){
					let error = errors[field];
					if(error){
						valid = false;
						break;
					}
				}

				if(valid){
					this.props.formChangeLoading();
					this.props.formAdd(this.props.form.values)
					.then(response => {
						this.props.formClear();
						this.props.clearList();
						this.props.formChangeLoading();
						this.props.loadList();
						this._setFocus(this.props.form.focus);
					});
				}
			}, 0);
		}else if(this.props.form.mode === 'edit'){
			setTimeout(() => {
				let values = $.extend({}, this.props.form.values);
				for(let field in values){
					let value = values[field];
					this._onChangeField(field, value);
				}

				const errors = this.props.form.errors;
				let valid = true;
				for(let field in errors){
					let error = errors[field];
					if(error){
						valid = false;
						break;
					}
				}
				if(valid){
					this.props.formChangeLoading();
					this.props.formEdit(this.props.detail.detail.id, this.props.form.values)
					.then(response => {
						setTimeout(() => {
							const key = this.props.detail.key;
							this.props.clearList();
							this.props.formChangeLoading();
							this.props.clearDetail();
							this._loadInit(key);
						}, 0);
					});
				}
			}, 0);
		}	
	}
	_onClickDelete(){
		this.setState({confirm: true});
	}
	_bindDelete(){
		setTimeout(() => {
			this.props.formDelete(this.props.detail.detail.id)
			.then(response => {
				this.props.clearDetail();
				//this.props.clearList();
				this.setState({confirm: false});
				this._loadInit(0);
			});
		}, 0);
	}
	_getSelectedFirst(){
		if(this.props.detail.key !== 0){
			this.props.selectDetail(this.props.list.list[0], 0);
			this._setScrollToRow();
		}
	}
	_getSelectedLast(){
		if(this.props.detail.key !== this.props.list.list.length-1){
			this.props.selectDetail(this.props.list.list[this.props.list.list.length-1], this.props.list.list.length-1);
			this._setScrollToRow();
		}
	}
	_getSelectedNext(){
		if(this.props.detail.detail.id){
			if(this.props.detail.key === this.props.list.list.length-1)
				this.props.selectDetail(this.props.list.list[0], 0);
			else
				this.props.selectDetail(this.props.list.list[this.props.detail.key+1], this.props.detail.key+1);
			this._setScrollToRow();
		}
	}
	_getSelectedPrevious(){
		if(this.props.detail.detail.id){
			if(this.props.detail.key === 0)
				this.props.selectDetail(this.props.list.list[this.props.list.list.length-1], this.props.list.list.length-1);
			else
				this.props.selectDetail(this.props.list.list[this.props.detail.key-1], this.props.detail.key-1);
			this._setScrollToRow();
		}
	}
	_setScrollToRow(){
		setTimeout(()=>{
			const row = $(`#row-${this.props.detail.key}`);
			Helper.ScrollIntoView(`#row-${this.props.detail.key}`, '#list');
		}, 0);
	}
	_onClickRow(detail, key){
		this.props.formClear();
		this.props.formChangeMode('edit');
		this.props.selectDetail(detail, key);
	}
	_setFormEdit(detail, key){
		if(this.props.form.mode !== 'edit'){
			this.props.formClear();
			this.props.formChangeMode('edit');
		}
		if(this.props.list.list.length > 0)
			this.props.selectDetail(detail, key);
	}
	_setFormAdd(){
		if(this.props.form.mode !== 'add'){
			this.props.formClear();
			this.props.formChangeMode('add');
		}
	}
	_onChangeField(field, value){
		let errors = Object.assign({}, this.props.form.errors);
		this.props.onChangeField(field, value, errors);
		this.props.formChange(field, value);
	}
	_renderField(field){
		switch(field.type){
			case 'text':
			case 'number':
			case 'email':
				return (
					<input data-next={field.tabNext} id={field.name} type={field.type} value={this.props.form.values[field.name]}
					onChange={event => this._onChangeField(field.name, event.target.value)}/>
				)
				break;
			case 'select':
				return (
					<Select data-next={field.tabNext} id={field.name}/>
				)
				break;
			case 'checkbox':
				return (
					<input type="checkbox" data-next={field.tabNext} id={field.name} value={this.props.form.values[field.name]}
					onChange={event => this._onChangeField(field.name, event.target.value)}/>
				)
				break;
		}
	}
	render(){	
        return (
			<div>
  				<ConfirmModal
  					modal={this.state.confirm}
  					message={I18n.t('application.text.confirmDelete')}
  					onAccept={() => this._bindDelete()}
  					onRequestClose={()=>this.setState({confirm: false})}/>
  				<Segment theme="basic no-margin-top no-margin-bottom no-padding-bottom">
  					<Header theme="center aligned no-margin-top">
	  					<Translate value={this.props.title}/>
	  				</Header>
  				</Segment>
  				<Segment theme="basic no-margin-bottom no-margin-top" id="list">
  					{/*<SegmentLoader loading={!this.props.list.list.length} title="application.text.loadingList"/>*/}
					<Table theme={"celled small compact small_table " + this.props.title + ""}>
						<thead>
							<tr>
							{
								this.props.header.map((h, key) => {
									return (
										<th key={key}><Translate value={h.label}/></th>
									);
								})
							}
							</tr>
						</thead>
						<tbody>
							{
								this.props.list.list.map((unit, key) => {
									const selected = (this.props.detail.detail.id === unit.id) ? 'active': '';
									return (
										<tr key={unit.id} onClick={this._onClickRow.bind(this, unit, key)} className={selected}
											id={`row-${key}`}>
											{
												this.props.header.map((h, key) => {
													return (
														<td key={key}>{unit[h.name]}</td>
													);
												})
											}
										</tr>
									);
								})
							}
						</tbody>
					</Table>
				</Segment>
				<Segment theme="basic no-margin-top no-margin-bottom">
					<Menu theme="left floated pagination small">
						<Item theme="icon" onClick={this._getSelectedFirst.bind(this)}>
							<Icon theme="angle double left"/>
						</Item>
						<Item theme="icon" onClick={this._getSelectedPrevious.bind(this)}>
							<Icon theme="angle left"/>
						</Item>
						<Item>
							{this.props.detail.key+1} / {this.props.list.list.length}
						</Item>
						<Item theme="icon" onClick={this._getSelectedNext.bind(this)}>
							<Icon theme="angle right"/>
						</Item>
						<Item theme="icon" onClick={this._getSelectedLast.bind(this)}>
							<Icon theme="angle double right"/>
						</Item>
					</Menu>
				</Segment>
				<Divider theme="clearing hidden"/>
				<Segment theme="basic no-margin-bottom no-margin-top no-padding-top" id="info">
					<SegmentLoader loading={this.props.form.loading} title="application.text.loading"/>
					<Header theme="top inverted attached">
						<Translate value="application.label.info"/>
					</Header>
					<Segment theme="attached">
						<Form theme="tiny">
							{
								this.props.formJson.map((form, keyForm) => {
									return (
										<Fields theme={`${Config.COLS_NAME[form.fields.length]} fields`} key={keyForm}>
											{
												form.fields.map((field, keyField) => {
													let theme = '';
													if(form.fields.length === 1)
														theme = 'sixteen wide';
													return (
														<Field theme={this.props.form.errors[field.name] ? `error ${theme}`: theme} key={keyField}>
															<label><Translate value={field.label}/></label>
															{this._renderField(field)}
															<Label theme="ui pointing tiny red basic" style={{display: this.props.form.errors[field.name] ? 'inline-block': 'none'}}>
																<Translate value={this.props.form.errors[field.name]}/>
															</Label>
														</Field>
													);
												})
											}
										</Fields>
									);
								})
							}
						</Form>
					</Segment>
					<div style={{marginTop: '14px'}}>
						<Button theme="small btn_add" onClick={this._onClickAdd.bind(this)}>
							<Translate value="application.button.add"/>
						</Button>
						<Button theme="small btn_save" onClick={this._onClickEdit.bind(this)}>
							<Translate value="application.button.edit"/>
						</Button>
						<Button theme="small btn_delete" onClick={this._onClickDelete.bind(this)}>
							<Translate value="application.button.delete"/>
						</Button>
						<Button theme="small right floated btn_esc" onClick={() => this.props.push(Routes.dashboard.view)}>
							<Translate value="application.button.exit"/>
						</Button>
					</div>
				</Segment>
			</div>
		);
	};
};

module.exports = FormKeyboard;