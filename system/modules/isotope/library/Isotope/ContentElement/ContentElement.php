<?php

/**
 * Isotope eCommerce for Contao Open Source CMS
 *
 * Copyright (C) 2009-2014 terminal42 gmbh & Isotope eCommerce Workgroup
 *
 * @package    Isotope
 * @link       http://isotopeecommerce.org
 * @license    http://opensource.org/licenses/lgpl-3.0.html
 */

namespace Isotope\ContentElement;

use ContentElement as Contao_ContentElement;
use Haste\Util\Debug;
use Haste\Util\RepositoryVersion;
use Isotope\Isotope;

abstract class ContentElement extends Contao_ContentElement
{

    /**
     * Initialize the content element
     * @param object
     */
    public function __construct($objElement)
    {
        parent::__construct($objElement);

        // Load Isotope JavaScript and style sheet
        if (TL_MODE == 'FE') {
            $version = RepositoryVersion::encode(Isotope::VERSION);

            $GLOBALS['TL_JAVASCRIPT'][] = Debug::uncompressedFile(
                'system/modules/isotope/assets/js/isotope.min.js|static|'.$version
            );

            $GLOBALS['TL_CSS'][] = Debug::uncompressedFile(
                'system/modules/isotope/assets/css/isotope.min.css|screen|static|'.$version
            );
        }
    }
}
