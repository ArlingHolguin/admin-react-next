import { Table  } from "antd";

const PaymentInfo = ({ data }) => {
  const showTable = data ? data.some(d => d.datetime != null) : false
 
  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Valor',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
      render: text => {
        return (
          <p 
            style={ 
              text == "Fallida" 
                ? {color: "#DF395D"} 
                : text == "Aprobada" ? {color: "#009688"} : {}} 
          >
            <strong>{text}</strong>
          </p>
        )
        },
    },
    {
      title: 'Mensaje',
      dataIndex: 'msg',
      key: 'msg',
    },
  ];

  const dataTable = data ? data?.map(pay => {
    return {
      date: pay.datetime,
      total: pay.total_value,
      state: pay.transaction_status,
      msg: pay.message
    }
  }) : null

  return (
    <>
    {showTable && (
      <>
      <h3>Información de pagos</h3>
      <Table columns={columns} dataSource={dataTable} />
      </>
    )}
    </>
  );
};

export default PaymentInfo;
