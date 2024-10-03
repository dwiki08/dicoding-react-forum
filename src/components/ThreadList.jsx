import ThreadItem from './ThreadItem';
import { threadListShape } from '../model_shapes';
export default function ThreadsList({
    threads,
    onUpVote,
    onDownVote,
    onNeuturalizeVote
}) {

    return (
        <>
            {threads.map((thread) => (
                <ThreadItem
                    key={thread.id}
                    {...thread}
                    onUpVote={onUpVote}
                    onDownVote={onDownVote}
                    onNeuturalizeVote={onNeuturalizeVote}
                />
            ))}
        </>
    );
}

ThreadsList.propTypes = threadListShape;
