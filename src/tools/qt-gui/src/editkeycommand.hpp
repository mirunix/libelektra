#ifndef EDITKEYCOMMAND_HPP
#define EDITKEYCOMMAND_HPP

#include <QUndoCommand>
#include "treeviewmodel.hpp"

class EditKeyCommand : public QUndoCommand
{

public:
	/**
	 * @brief ...
	 * 
	 * @param model ...
	 * @param index ...
	 * @param data ...
	 * @param parent ...
	 */
	explicit        EditKeyCommand(TreeViewModel* model, int index, QVariantList data, QUndoCommand* parent = 0);
	virtual void    undo();
	virtual void    redo();

private:

	TreeViewModel*  m_model;
	int             m_index;

	QString         m_oldName;
	QVariant        m_oldValue;
	QVariantMap     m_oldMetaData;

	QString         m_newName;
	QVariant        m_newValue;
	QVariantMap     m_newMetaData;
};

#endif // EDITKEYCOMMAND_HPP
