# avoid build artifacts in the source folder
get_filename_component (CMAKE_CURRENT_BINARY_PARENT_DIR "${CMAKE_CURRENT_BINARY_DIR}" DIRECTORY)
file (COPY "${CMAKE_CURRENT_SOURCE_DIR}" DESTINATION "${CMAKE_CURRENT_BINARY_PARENT_DIR}")

configure_file ("${CMAKE_CURRENT_SOURCE_DIR}/spectranslator.cabal.in" "${CMAKE_CURRENT_BINARY_DIR}/spectranslator.cabal" @ONLY)
