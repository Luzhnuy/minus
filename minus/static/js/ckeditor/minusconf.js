CKEDITOR.editorConfig = function( config )
{
    config.toolbar = 'MinusToolbar';

	config.language = 'uk';
	config.uiColor = '#EEF2DF';

    config.toolbar_MinusToolbar =
    [
        ['Cut','Copy','Paste'],
        ['Undo','Redo','-','SelectAll','RemoveFormat'],
        ['Image','HorizontalRule','Smiley','SpecialChar'],
        ['Source'],
        '/',
        ['Bold','Italic','Strike'],
        ['TextColor','BGColor'],
        ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
        ['Link','Unlink']
    ];
};

