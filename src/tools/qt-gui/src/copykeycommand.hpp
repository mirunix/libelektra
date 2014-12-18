#ifndef COPYKEYCOMMAND_H
#define COPYKEYCOMMAND_H

#include <QUndoCommand>
#include "confignode.hpp"

#include <QDebug>

class CopyKeyCommand : public QUndoCommand
{
public:
	/**
	 * @brief The command to copy and paste a ConfigNode.
	 *
	 * @param type Declares if the ConfigNode is a single key or a branch.
	 * @param source The ConfigNode that is copied.
	 * @param target The ConfigNode that is the new parent node of the copied ConfigNode.
	 */
	explicit CopyKeyCommand(QString type, ConfigNodePtr source, ConfigNodePtr target, QUndoCommand* parent = 0);

	virtual void undo();
	virtual void redo();

private:

	ConfigNodePtr m_source;
	ConfigNodePtr m_target;
	bool          m_isExpanded;
	int           m_index;
};

#endif // COPYKEYCOMMAND_H
