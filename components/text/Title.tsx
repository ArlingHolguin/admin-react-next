import { Row } from "antd";
import "../../assets/components/text/title.less";

interface ITitle {
  text: string;
  align?: string;
  className?: string;
  style?: any,
  textStyle? : any
}

const Title = ({
  text, 
  align = 'left',
  className,
  style,
  textStyle,
}: ITitle) => {
	return (
		<Row 
      className={`subtitle ${align} ${className}`}
      style={{...style}}
    >
      <h2 style={{...textStyle}} >{text}</h2>
    </Row>
	);
};

export default Title;
