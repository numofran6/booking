import { FaMapPin } from 'react-icons/fa';
import { Button, IconButton, Rating } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BookedTourPreview = ({ item, dispatch }) => {
	const navigate = useNavigate();
	const [showOptionsPanel, setShowOptionsPanel] = useState(false);

	const handleDelete = () => {
		dispatch({ type: 'REMOVE_TOUR', payload: item });
		setShowDeletePanel(false);
	};

	return (
		<>
			<div
				className="booked-tour-preview bg-cover"
				style={{ backgroundImage: `url(${item.images[0]})` }}
			>
				<div className="booked-tour-preview-content">
					<div className="space-y-1 ">
						<a
							onClick={() =>
								navigate(`/tour/${item.title}`, { state: { tour: item } })
							}
							className="font-heading text-3xl cursor-pointer gb-transition hover:text-yellow-600"
						>
							{item.title}
						</a>

						<h6 className="flex items-center space-x-1">
							<FaMapPin className="text-amber-500" /> <span>{item.region}</span>
						</h6>

						<Rating
							value={item.rating}
							precision={0.5}
							size="small"
							readOnly
							className="mr-1"
						/>
						<h6>
							<span className="font-semibold">Activity:</span> {item.activity}
						</h6>

						<div className="text-sm flex items-center justify-between">
							<h6>
								<span className="font-semibold">Date:</span> {item.bookingDate}
							</h6>

							<h6>
								<span className="font-semibold">Tour Buddy:</span>{' '}
								{item.tourBuddy}
							</h6>
						</div>
					</div>

					<p className="text-xs">{item.desc.slice(0, 250)}...</p>

					<div className="flex justify-end">
						<IconButton
							style={{ color: '#fcfcfc', backgroundColor: '#295B5F' }}
							className="w-24 h-24 rounded-full flex flex-col justify-center"
							onClick={() => setShowOptionsPanel(true)}
						>
							<p className="text-xs">Delete</p>
						</IconButton>
					</div>
				</div>
			</div>

			{showOptionsPanel && (
				<div className="fixed inset-0 bg-black bg-opacity-90 z-50">
					<div className="flex flex-col h-full justify-center max-w-md mx-auto px-7">
						<div className="bg-gray-100 space-y-5 p-7 rounded-lg">
							<h4 className="font-semibold text-gray-900">
								Are you sure you want to miss out on this experience?
							</h4>
							<div className="flex items-center justify-end space-x-5">
								<Button
									variant="outlined"
									onClick={() => setShowOptionsPanel(false)}
								>
									Cancel
								</Button>
								<Button
									variant="contained"
									color="error"
									onClick={handleDelete}
									disableElevation
								>
									Delete
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
