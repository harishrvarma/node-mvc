<div>
	{self.set('name', <span>1111</span>)}

	{Object.entries(self.getChildren()).map((value, index) => {
        return (<div key={value[0]}>{(value[1]).toHtml()}{self.get('name')}</div>);
    })}	
</div>
