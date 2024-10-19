import './Card.css'
import PropTypes from 'prop-types'
const Card = (props) => {
	// const [flipped,setFlipped]=useState(false)
	return (
		<div className="card">
			<div className={props.flipped ? 'flipped' : ''}>
				<img src={props.card.src} className="front-img" alt="card front" />
				<img
					src="/img/cover.png"
					className="back-img"
					alt="card back"
					onClick={() => {
						!props.disabled ? props.handleClick(props.card) : null
					}}
				/>
			</div>
		</div>
	)
}
export default Card
Card.propTypes = {
	card: PropTypes.exact({
		src: PropTypes.string,
		id: PropTypes.number,
		matched: PropTypes.bool,
	}),
	flipped: PropTypes.bool,
	handleClick: PropTypes.func,
	disabled: PropTypes.bool,
}
