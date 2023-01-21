import React, { useRef, useState } from 'react'
import { Row, Button, Modal, Input } from "antd";
import Router, { useRouter } from "next/router";

const ModalCodeDiscount = ({visible, onClose, currentSearch}) => {
  const [newCode, setNewCode] = useState("");

  const handleNormalSearch = ({}) => { 
    if(currentSearch){
      const path= `/vuelos/${
        currentSearch[0]
      }/${currentSearch[1]}/${currentSearch[2]}/${currentSearch[3]}/${currentSearch[4]}/${currentSearch[5]}/${currentSearch[6]}/${currentSearch[7]}`
      Router.push({
        pathname: path
      });
    }
  }

  const handleNewSearch = () => {
    if(newCode){
      const path= `/vuelos/${
        currentSearch[0]
      }/${currentSearch[1]}/${currentSearch[2]}/${currentSearch[3]}/${currentSearch[4]}/${currentSearch[5]}/${currentSearch[6]}/${currentSearch[7]}/${newCode}`
      Router.push({
        pathname: path
      });
    }
  }

  return (
    <Modal
      className="modal-without-footer"
      visible={visible}
      width={620}
    >
      <Row type="flex" align="middle" style={{flexDirection: "column"}}>
        <h2 style={{margin: '10px', textTransform: 'uppercase'}}>Codigo de Descuento</h2>
        <p style={{textAlign: 'center'}}>No se encontraron vuelos para el código de descuento proporcionado</p>
        <p style={{textAlign: 'center'}}>Puedes realizar una <strong>nueva búsqueda</strong> con otro código  de descuento, o realizar una <strong>búsqueda sin código</strong>.</p>
        <Row className="m10" type="flex" align="middle" style={{flexDirection: "column"}}>
          <Input
            placeholder="Código de descuento"
           onChange={(value) => setNewCode(value.target.value)}
          />
          <Button 
            className="m10"
            disabled={!newCode}
            type="primary" 
            style={{ padding: "5px 15px" }}
            onClick={handleNewSearch}
          >
            Nueva Busqueda
          </Button>
          <Button 
            type="primary" 
            style={{ padding: "5px 15px" }}
            onClick={handleNormalSearch}
          >
            Buscar sin Codigo
          </Button>
        </Row>
      </Row>
    </Modal>
  )
}

export default ModalCodeDiscount
