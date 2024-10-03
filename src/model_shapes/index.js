import PropTypes from "prop-types";

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number,
  threadOwner: PropTypes.shape(userShape).isRequired,
  authUserId: PropTypes.string.isRequired,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  onNeuturalizeVote: PropTypes.func,
  showFull: PropTypes.bool,
  isHandleClick: PropTypes.bool,
};

const threadListShape = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeuturalizeVote: PropTypes.func.isRequired,
};

export { userShape, threadItemShape, threadListShape };
